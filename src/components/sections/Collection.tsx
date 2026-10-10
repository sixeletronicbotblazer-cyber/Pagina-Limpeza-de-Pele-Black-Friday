"use client";

import { motion } from "framer-motion";
import { Check, BookOpen, PlayCircle, ListChecks, Award } from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";

const INCLUDE_ICONS = [BookOpen, PlayCircle, ListChecks, Award] as const;

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Collection() {
  const { ref, visible } = useReveal();
  const benefits = content.benefits;
  const includes = content.includes;

  return (
    <section
      id="colecao"
      aria-label="Produto completo"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Produto completo
          </p>
          <h2 className="font-editorial mt-3 max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            Do estudo da pele à organização dos seus atendimentos
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Coleção real, 54 páginas, oito tópicos, fichas e checklist. O
            certificado é item da oferta.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* Coluna esquerda: device trio mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto h-[360px] w-full max-w-md sm:h-[420px]"
          >
            {/* Livro/capa ao fundo */}
            <div
              aria-hidden
              className="absolute left-2 top-6 z-0 w-32 -rotate-6 overflow-hidden rounded-lg border border-[#e7dcc8] bg-white shadow-lg sm:w-40"
            >
              <img
                src="/assets/pagina-01.webp"
                alt=""
                width={160}
                height={226}
                className="aspect-[1/1.414] w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Tablet frame mostrando pagina-11 */}
            <div className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] rounded-2xl bg-[#322a2c]/5 p-2 shadow-2xl shadow-[#650d25]/20 sm:w-72">
              <div className="overflow-hidden rounded-xl border border-[#e7dcc8] bg-white">
                <img
                  src="/assets/pagina-11.webp"
                  alt="Prévia da apostila — Conheça a pele"
                  width={288}
                  height={407}
                  className="aspect-[1/1.414] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Phone sobreposto */}
            <div className="animate-float-soft absolute -bottom-2 -right-2 z-20 w-28 rotate-6 overflow-hidden rounded-xl border-4 border-white bg-white shadow-xl sm:w-32">
              <img
                src="/assets/pagina-17.webp"
                alt="Prévia da apostila — Tipos de pele"
                width={128}
                height={181}
                className="aspect-[1/1.414] w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Coluna direita: lista de benefícios */}
          <div>
            <h3 className="font-editorial text-xl text-[#322a2c] sm:text-2xl">
              O que você vai estudar
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-8%" }}
                  className="flex items-start gap-2.5 text-left text-sm text-[#322a2c] sm:text-[15px]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8c9ca] text-[#650d25]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="leading-snug">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Faixa "inclui" */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {includes.map(([title, desc], i) => {
            const Icon = INCLUDE_ICONS[i % INCLUDE_ICONS.length];
            return (
              <motion.div
                key={title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-8%" }}
                className="flex flex-col gap-2 rounded-2xl border border-[#e7dcc8] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#650d25]/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8c9ca]/50 text-[#650d25]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="font-semibold text-sm text-[#650d25]">{title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
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
