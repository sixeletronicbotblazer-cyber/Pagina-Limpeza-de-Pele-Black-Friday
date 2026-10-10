"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";
import { CtaButton } from "@/components/CtaButton";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Mechanism() {
  const { ref, visible } = useReveal();
  const steps = content.steps;

  return (
    <section
      id="caminho"
      aria-label="Caminho de aprendizado"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} text-center`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Um caminho para sair do zero
          </p>
          <h2 className="font-editorial mt-3 mx-auto max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            Do primeiro estudo à organização do atendimento
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Quatro passos para transformar o material em um plano real de
            aprendizado.
          </p>
        </div>

        {/* Desktop: 4 columns connected by dashed line */}
        <div className="relative mt-14 hidden lg:block">
          {/* Horizontal dashed line with dots */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-[26px] flex items-center"
          >
            <div className="h-0 flex-1 border-t-2 border-dashed border-[#650d25]/30" />
            {steps.map((_, i) => (
              <div key={i} className="relative flex items-center">
                <span className="h-3 w-3 rounded-full bg-[#650d25] shadow-[0_0_0_4px_#fbf7f0]" />
                {i < steps.length - 1 && (
                  <div className="h-0 w-[calc(100%-0px)] min-w-[140px] border-t-2 border-dashed border-[#650d25]/30" />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map(([title, desc], i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="relative flex flex-col items-center pt-16 text-center"
              >
                <span className="absolute left-1/2 top-0 -translate-x-1/2 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#650d25] bg-[#fbf7f0] font-editorial text-lg font-semibold text-[#650d25] shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-editorial mt-4 text-lg leading-snug text-[#322a2c]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-10 lg:hidden">
          <div
            aria-hidden
            className="absolute left-[26px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-[#650d25]/30"
          />
          <div className="space-y-6">
            {steps.map(([title, desc], i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="relative flex gap-4 pl-0"
              >
                <span className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-[#650d25] bg-[#fbf7f0] font-editorial text-lg font-semibold text-[#650d25] shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 rounded-2xl border border-[#e7dcc8] bg-white p-4">
                  <h3 className="font-editorial text-base leading-snug text-[#322a2c]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <CtaButton href="#previas" variant="secondary" event="ViewContent">
            Conhecer as prévias
          </CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
