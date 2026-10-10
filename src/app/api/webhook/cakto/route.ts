import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Webhook de confirmação de pagamento — Cakto.
 *
 * Recebe eventos de pagamento confirmado e armazena a compra (deduplicando
 * por externalId). Os dados de exibição (nome, cidade/UF) só são guardados
 * se vieram no evento; caso contrário, a notificação pública exibe
 * "Uma nova inscrição foi confirmada."
 *
 * Validação: token secreto compartilhado (env CAKTO_WEBHOOK_SECRET),
 * conferido no header `x-cakto-signature` ou query `?secret=`.
 * Se o secret não estiver configurado, a rota recusa (401) — configure em .env.
 *
 * Como o payload exato da Cakto pode variar, fazemos parsing defensivo
 * procurando os campos comuns em vários caminhos possíveis. O produtor pode
 * ajustar o mapeamento conforme o payload real recebido.
 */

// Caminhos possíveis para cada campo — tenta em ordem.
const NAME_PATHS = [
  "customer.name",
  "client.name",
  "buyer.name",
  "comprador.nome",
  "customer.firstName",
  "nome",
  "name",
  "client.nome",
];
const CITY_PATHS = [
  "customer.city",
  "client.city",
  "buyer.city",
  "comprador.cidade",
  "cidade",
  "city",
  "customer.address.city",
  "client.address.city",
];
const UF_PATHS = [
  "customer.uf",
  "customer.state",
  "client.uf",
  "client.state",
  "buyer.state",
  "uf",
  "state",
  "customer.address.state",
  "customer.address.uf",
];
const ID_PATHS = [
  "id",
  "transaction_id",
  "transactionId",
  "code",
  "reference",
  "referencia",
  "pedido",
  "order_id",
  "orderId",
  "external_id",
  "externalReference",
  "data.id",
  "payload.id",
];
const STATUS_PATHS = [
  "status",
  "situacao",
  "payment_status",
  "paymentStatus",
  "data.status",
  "current_status",
];
const AMOUNT_PATHS = [
  "amount",
  "value",
  "valor",
  "price",
  "total",
  "data.amount",
];

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function firstString(obj: unknown, paths: string[]): string | undefined {
  for (const p of paths) {
    const v = getPath(obj, p);
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number") return String(v);
  }
  return undefined;
}

// Status que consideramos "confirmado/pago".
const CONFIRMED_STATUS = new Set([
  "paid",
  "approved",
  "confirmed",
  "completed",
  "paga",
  "aprovado",
  "aprovada",
  "confirmado",
  "confirmada",
  "completed",
  "approved",
  "1",
]);

export async function POST(req: NextRequest) {
  // 1. Validação do secret.
  const secret = process.env.CAKTO_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook secret não configurado." },
      { status: 401 },
    );
  }
  const sig = req.headers.get("x-cakto-signature") || req.headers.get("x-signature");
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  if (sig !== secret && querySecret !== secret) {
    return NextResponse.json({ ok: false, error: "Token inválido." }, { status: 401 });
  }

  // 2. Parse do corpo.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  // Cakto pode enviar { event, data } ou o objeto direto.
  const root = (body && typeof body === "object" && "data" in (body as object))
    ? ((body as Record<string, unknown>).data ?? body)
    : body;

  // 3. Status — só registra compras confirmadas.
  const status = firstString(root, STATUS_PATHS)?.toLowerCase();
  // Se há campo de status e não é confirmado, ignora (não é erro).
  if (status && !CONFIRMED_STATUS.has(status)) {
    return NextResponse.json({ ok: true, ignored: true, reason: "status-not-confirmed" });
  }

  // 4. Identificador externo (deduplicação).
  const externalId =
    firstString(root, ID_PATHS) ||
    (typeof (root as Record<string, unknown>)?.id === "number"
      ? String((root as Record<string, unknown>).id)
      : undefined);

  if (!externalId) {
    return NextResponse.json(
      { ok: false, error: "Sem identificador de transação." },
      { status: 400 },
    );
  }

  // 5. Deduplicação: se já existe, retorna OK sem recriar.
  const existing = await db.purchase.findUnique({ where: { externalId } });
  if (existing) {
    return NextResponse.json({ ok: true, duplicated: true });
  }

  // 6. Dados de exibição (apenas autorizados — se ausentes ficam nulos).
  const firstName = firstString(root, NAME_PATHS) || null;
  const city = firstString(root, CITY_PATHS) || null;
  const ufRaw = firstString(root, UF_PATHS);
  const uf = ufRaw ? ufRaw.slice(0, 2).toUpperCase() : null;
  const amountStr = firstString(root, AMOUNT_PATHS);
  const amountBrl = amountStr ? Math.round(parseFloat(amountStr) * 100) : null;

  // 7. Persistência.
  await db.purchase.create({
    data: {
      externalId,
      firstName,
      city,
      uf,
      amountBrl: Number.isFinite(amountBrl) ? (amountBrl as number) : null,
      confirmedAt: new Date(),
      rawPayload: JSON.stringify(body).slice(0, 8000),
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  // Apenas confirma que a rota existe. Não expõe dados.
  return NextResponse.json({ ok: true, service: "cakto-webhook" });
}
