"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Faq() {
  const { ref, visible } = useReveal();
  const faqs = content.faq;

  return (
    <section
      id="faq"
      aria-label="Perguntas frequentes"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <style>{`
        .faq-item > summary .faq-chevron { transition: transform 0.3s ease; }
        .faq-item[open] > summary .faq-chevron { transform: rotate(180deg); }
        .faq-item > summary { list-style: none; }
        .faq-item > summary::-webkit-details-marker { display: none; }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} text-center`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Perguntas frequentes
          </p>
          <h2 className="font-editorial mt-3 mx-auto max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            Antes de começar, tire suas dúvidas
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {faqs.map(([question, answer], i) => (
            <motion.details
              key={question}
              custom={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-6%" }}
              className="faq-item mb-3 overflow-hidden rounded-xl border border-[#e7dcc8] bg-white"
            >
              <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 p-4 text-left font-semibold text-[#322a2c] transition-colors hover:bg-[#fbf7f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650d25] focus-visible:ring-inset">
                <span className="text-sm sm:text-[15px]">{question}</span>
                <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-[#650d25]" />
              </summary>
              <p className="px-4 pb-4 pt-0 text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </motion.details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Ainda com dúvidas?{" "}
          <span className="font-semibold text-[#650d25]">
            O material inclui orientações de uso na área do curso.
          </span>
        </p>
      </div>
    </section>
  );
}
