"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Check } from "lucide-react";
import { content } from "@/lib/content";
import { CtaButton } from "@/components/CtaButton";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const c = content.hero;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden grain"
      aria-label="Abertura"
    >
      {/* Fundo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#e8c9ca]/40 blur-3xl animate-drift" />
        <div
          className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#d9b48a]/30 blur-3xl animate-drift"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Texto */}
          <div className="text-center lg:text-left">
            <motion.span
              custom={0}
              variants={fade}
              initial="hidden"
              animate="show"
              className="animate-badge-pop inline-flex items-center gap-1.5 rounded-full border border-[#650d25]/15 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#650d25] backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {c.eyebrow}
            </motion.span>

            <motion.h1
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="font-editorial mt-5 text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl lg:text-[2.9rem]"
            >
              {c.title}
            </motion.h1>

            <motion.p
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 sm:text-lg"
            >
              {c.sub}
            </motion.p>

            <motion.div
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <CtaButton
                href="#oferta"
                event="InitiateCheckout"
                eventData={{ content_name: "Limpeza de Pele", value: 47, currency: "BRL" }}
                className="animate-pulse-ring"
              >
                {c.ctaPrimary}
                <ArrowDown className="h-4 w-4" />
              </CtaButton>
              <CtaButton href="#previas" variant="secondary" event="ViewContent">
                {c.ctaSecondary}
              </CtaButton>
            </motion.div>

            <motion.ul
              custom={4}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-8 space-y-2.5"
            >
              {c.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-left text-sm text-[#322a2c] sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8c9ca] text-[#650d25]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Imagem + mockups */}
          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Tag flutuante */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -left-2 top-6 z-20 rotate-[-4deg] rounded-xl border border-[#650d25]/10 bg-white px-3 py-1.5 shadow-lg sm:-left-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {content.badge}
                </p>
                <p className="font-editorial text-sm font-semibold text-[#650d25]">
                  por R$47
                </p>
              </motion.div>

              {/* Foto principal */}
              <div className="relative overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(101,13,37,0.45)] ring-1 ring-[#650d25]/10">
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet="/assets/hero-foto-mobile.webp"
                  />
                  <img
                    src="/assets/hero-foto.webp"
                    alt="Natália Cavalcante e cena ilustrativa de limpeza de pele"
                    width={680}
                    height={453}
                    className="aspect-[3/2] w-full animate-float-soft object-cover"
                    fetchPriority="high"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#650d25]/25 via-transparent to-transparent" />
              </div>

              {/* Card de capa sobreposto */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 6 }}
                animate={{ opacity: 1, y: 0, rotate: 6 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -right-3 z-20 w-28 overflow-hidden rounded-xl border-4 border-white shadow-xl sm:w-36"
              >
                <img
                  src="/assets/pagina-01.webp"
                  alt="Capa da apostila"
                  width={140}
                  height={198}
                  className="aspect-[1/1.414] w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -left-3 bottom-4 z-20 grid grid-cols-3 gap-1 rounded-xl border border-[#e8c9ca] bg-white/95 p-2 px-3 shadow-lg backdrop-blur sm:-left-6"
              >
                {c.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-editorial text-base font-semibold leading-none text-[#650d25] sm:text-lg">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-wide text-muted-foreground sm:text-[10px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
