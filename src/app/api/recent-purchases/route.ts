import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Compras confirmadas recentemente (webhook Cakto).
 *
 * GET /api/recent-purchases?since=<iso>
 *
 * Retorna apenas os campos de exibição autorizados. Se nome ou cidade forem
 * nulos, o frontend exibe "Uma nova inscrição foi confirmada."
 *
 * Nunca gera compradores fictícios. Se não houver compras confirmadas
 * recentemente, retorna lista vazia — o frontend não exibe notificações.
 */

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sinceParam = url.searchParams.get("since");
  const since = sinceParam ? new Date(sinceParam) : new Date(Date.now() - 60 * 60 * 1000);

  // Últimas 2h, no máximo 20 registros. Ordenadas por confirmação mais recente.
  const items = await db.purchase.findMany({
    where: { confirmedAt: { gte: since } },
    orderBy: { confirmedAt: "desc" },
    take: 20,
  });

  return NextResponse.json(
    items.map((p) => ({
      id: p.id,
      firstName: p.firstName,
      city: p.city,
      uf: p.uf,
      confirmedAt: p.confirmedAt.toISOString(),
    })),
  );
}
