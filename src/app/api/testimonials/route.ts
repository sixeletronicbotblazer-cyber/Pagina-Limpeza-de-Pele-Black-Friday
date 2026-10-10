import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

/**
 * Depoimentos reais do curso.
 *
 * GET  /api/testimonials         -> lista aprovados (público). Se vazio, a
 *                                   seção fica oculta na página pública.
 * POST /api/testimonials         -> cria um depoimento (admin, protegido por
 *                                   ADMIN_TOKEN no header Authorization: Bearer).
 *                                   Sem aprovação automática? Use approved:true
 *                                   para já publicar (padrão true para facilitar).
 *
 * Nunca inventa depoimentos. O produtor cadastra os reais via POST ou seed.
 */

const TestimonialSchema = z.object({
  comment: z.string().min(3).max(280),
  firstName: z.string().min(1).max(60),
  city: z.string().min(1).max(80),
  uf: z.string().length(2),
  rating: z.number().int().min(1).max(5),
  approved: z.boolean().optional().default(true),
});

export async function GET() {
  const items = await db.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  // Expõe apenas os campos de exibição.
  return NextResponse.json(
    items.map((t) => ({
      id: t.id,
      comment: t.comment,
      firstName: t.firstName,
      city: t.city,
      uf: t.uf,
      rating: t.rating,
    })),
  );
}

export async function POST(req: NextRequest) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_TOKEN não configurado." },
      { status: 401 },
    );
  }
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.replace(/^Bearer\s+/i, "");
  if (bearer !== token) {
    return NextResponse.json({ ok: false, error: "Token inválido." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }
  const parsed = TestimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const created = await db.testimonial.create({
    data: {
      comment: parsed.data.comment,
      firstName: parsed.data.firstName,
      city: parsed.data.city,
      uf: parsed.data.uf.toUpperCase(),
      rating: parsed.data.rating,
      approved: parsed.data.approved,
    },
  });
  return NextResponse.json({ ok: true, id: created.id });
}
