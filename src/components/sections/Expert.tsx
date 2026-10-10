"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";

export default function Expert() {
  const { ref, visible } = useReveal();
  const e = content.expert;

  return (
    <section
      id="especialista"
      aria-label="Especialista"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Coluna esquerda: retrato + quote card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Blob decorativo */}
            <div
              aria-hidden
              className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-[#e8c9ca]/40 blur-3xl"
            />

            <div className="relative animate-float-soft overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(101,13,37,0.45)] ring-1 ring-[#650d25]/10">
              <img
                src="/assets/natalia.webp"
                alt={`Retrato de ${e.name}, especialista em limpeza de pele`}
                width={560}
                height={700}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#650d25]/20 via-transparent to-transparent" />
            </div>

            {/* Card de citação sobreposto */}
            <motion.blockquote
              initial={{ opacity: 0, y: 18, x: -8 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -bottom-5 -left-2 z-20 max-w-[220px] rounded-xl border border-[#e8c9ca] bg-white p-4 shadow-lg sm:-left-5"
            >
              <p className="font-editorial text-sm italic leading-snug text-[#322a2c]">
                “{e.quote}”
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Coluna direita: bio */}
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
            <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
              Aprenda com
            </p>
            <h2 className="font-editorial mt-3 text-3xl text-[#650d25] sm:text-4xl">
              {e.name}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {e.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="animate-badge-pop inline-flex items-center rounded-full bg-[#e8c9ca]/30 px-3 py-1 text-xs font-semibold text-[#650d25]">
                ≈ 5 anos de prática
              </span>
              <span className="animate-badge-pop inline-flex items-center rounded-full bg-[#e8c9ca]/30 px-3 py-1 text-xs font-semibold text-[#650d25]">
                Atendimento a clientes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
