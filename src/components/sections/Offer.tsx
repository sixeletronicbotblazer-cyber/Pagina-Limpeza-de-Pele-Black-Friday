"use client";

import { motion } from "framer-motion";
import { Flame, ShieldCheck, Lock, Award } from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";
import { CtaButton } from "@/components/CtaButton";
import CountdownTimer from "@/components/CountdownTimer";
import { CHECKOUT_URL, BLACK_FRIDAY_FIM } from "@/lib/comercial";

export default function Offer() {
  const { ref, visible } = useReveal();
  const o = content.offer;

  return (
    <section
      id="oferta"
      aria-label="Oferta"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Fundo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#e8c9ca]/30 blur-3xl animate-drift" />
        <div
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#d9b48a]/20 blur-3xl animate-drift"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`reveal ${visible ? "is-visible" : ""} text-center`}
        >
          <span className="animate-badge-pop inline-flex items-center gap-1.5 rounded-full border border-[#650d25]/15 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#650d25] backdrop-blur">
            <Flame className="h-3.5 w-3.5" />
            Black Friday
          </span>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            {o.eyebrow}
          </p>
          <h2 className="font-editorial mt-3 text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            {o.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {o.desc}
          </p>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-[#e8c9ca]/20 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Oferta antecipada encerra em:
          </p>
          <CountdownTimer targetIso={BLACK_FRIDAY_FIM} />
        </motion.div>

        {/* Card principal da oferta */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="animate-glow-border relative mx-auto mt-10 max-w-xl rounded-3xl border-2 border-[#650d25]/15 bg-white p-6 shadow-2xl shadow-[#650d25]/10 sm:p-8"
        >
          {/* Mini device trio / hero image com selo */}
          <div className="relative mx-auto mb-6 w-full max-w-[200px]">
            <div className="overflow-hidden rounded-xl border border-[#e7dcc8] shadow-md">
              <img
                src="/assets/pagina-01.webp"
                alt="Capa da apostila de limpeza de pele"
                width={200}
                height={283}
                className="aspect-[1/1.414] w-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#650d25] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#fbf7f0] shadow-lg">
              Apostila + Aulas + Certificado
            </span>
          </div>

          {/* Bloco de preço */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              De R$97 por apenas
            </p>
            <p className="font-editorial mt-1 text-5xl text-[#650d25] sm:text-6xl">
              {o.price}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{o.payment}</p>
            <p className="mt-1 text-sm text-muted-foreground">{o.parcela}</p>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <CtaButton
              href={CHECKOUT_URL || undefined}
              event="InitiateCheckout"
              eventData={{
                content_name: "Limpeza de Pele",
                value: 47,
                currency: "BRL",
              }}
              className="w-full text-lg animate-pulse-ring"
            >
              {o.cta}
            </CtaButton>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
              {o.note}
            </p>
          </div>
        </motion.div>

        {/* Linha de confiança */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[#322a2c]">
            <ShieldCheck className="h-4 w-4 text-[#650d25]" />
            Pagamento único
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#322a2c]">
            <Lock className="h-4 w-4 text-[#650d25]" />
            Acesso vitalício
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#322a2c]">
            <Award className="h-4 w-4 text-[#650d25]" />
            Certificado incluso
          </span>
        </motion.div>
      </div>
    </section>
  );
}
