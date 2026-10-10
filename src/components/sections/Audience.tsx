"use client";

import { motion } from "framer-motion";
import {
  Coins,
  Sprout,
  Home,
  Clock,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";

const ICONS = [
  Coins,
  Sprout,
  Home,
  Clock,
  Sparkles,
  ClipboardList,
] as const;

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Audience() {
  const { ref, visible } = useReveal();
  const items = content.audience;

  return (
    <section
      id="para-quem"
      aria-label="Para quem é"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} text-center`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Para quem é
          </p>
          <h2 className="font-editorial mt-3 mx-auto max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            Se você se reconhece, este material é para você
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Um curso introdutório pensado para diferentes pontos de partida.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, desc], i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="group flex min-h-[160px] flex-col rounded-2xl border border-[#e7dcc8] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#650d25]/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8c9ca]/40 text-[#650d25] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="font-editorial mt-4 text-lg font-semibold leading-snug text-[#650d25]">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
