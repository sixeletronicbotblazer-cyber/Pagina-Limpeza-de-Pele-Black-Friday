"use client";

import { motion } from "framer-motion";
import {
  CircleAlert,
  BookOpen,
  Wrench,
  Sparkle,
  Tag,
  Route,
  ArrowRight,
} from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";

const ICONS = [
  CircleAlert,
  BookOpen,
  Wrench,
  Sparkle,
  Tag,
  Route,
] as const;

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Pains() {
  const { ref, visible } = useReveal();
  const pains = content.pains;

  return (
    <section
      id="dores"
      aria-label="Dores"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Por onde começar
          </p>
          <h2 className="font-editorial mt-3 max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            Começar na estética não precisa ser estudar sem direção.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            São dúvidas comuns de quem está começando — e que ganham um caminho
            quando você tem o material certo nas mãos.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((pain, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={pain}
                custom={i}
                variants={fade}
                initial="hidden"
                animate="visible"
                className="group relative flex min-h-[112px] items-start gap-4 rounded-2xl border border-[#e7dcc8] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#650d25]/5 focus-within:-translate-y-1 focus-within:shadow-lg"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8c9ca]/50 text-[#650d25] transition-transform duration-300 group-hover:scale-110"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <span className="mb-1 block font-editorial text-xs font-semibold uppercase tracking-wider text-[#650d25]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-snug text-[#322a2c]">
                    {pain}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-[#e8c9ca] bg-[#e8c9ca]/30 p-6 sm:p-7"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-1.5 bg-[#650d25]"
          />
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 rotate-90 text-[#650d25]" />
            <p className="font-editorial text-lg leading-snug text-[#322a2c] sm:text-xl">
              {content.painsBridge}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
