"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointerClick } from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";

type Preview = [pageId: string, title: string, desc: string];

export default function Gallery() {
  const previews = content.previews as Preview[];
  const { ref, visible } = useReveal();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const open = useCallback((i: number) => setActive(i), []);

  // Lock body scroll + Escape to close
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  const current = active === null ? null : previews[active];

  return (
    <section
      id="previas"
      aria-label="Prévias da apostila"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Soft bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-[#e8c9ca]/25 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} text-center`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Veja o material
          </p>
          <h2 className="font-editorial mt-3 mx-auto max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            Prévias da apostila que vai acompanhar seu aprendizado
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Páginas reais do PDF ilustrado. Toque para ampliar e conhecer o
            conteúdo de perto.
          </p>
        </div>
      </div>

      {/* Marquee gallery */}
      <div className="marquee-track relative mt-12">
        {/* fade edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#fbf7f0] to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#fbf7f0] to-transparent sm:w-28"
        />
        <div className="flex w-max animate-marquee gap-4 px-4">
          {[...previews, ...previews].map((p, idx) => {
            const [id, title, desc] = p;
            const realIndex = idx % previews.length;
            return (
              <button
                key={`${id}-${idx}`}
                type="button"
                onClick={() => open(realIndex)}
                aria-label={`Ampliar prévia: ${title}`}
                className="group w-[240px] shrink-0 overflow-hidden rounded-2xl border border-[#e7dcc8] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#650d25]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650d25] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7f0] sm:w-[280px]"
              >
                <div className="relative aspect-[1/1.414] overflow-hidden bg-[#f3ead8]">
                  <img
                    src={`/assets/pagina-${id}-thumb.webp`}
                    alt={`Prévia da página ${id} — ${title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-[#650d25]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#fbf7f0] backdrop-blur">
                    Pág. {id}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-editorial text-sm font-semibold leading-snug text-[#650d25]">
                    {title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 px-4 text-xs text-muted-foreground sm:px-6">
        <MousePointerClick className="h-4 w-4 text-[#650d25]" />
        <span>Arraste ou clique para ampliar</span>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Prévia ampliada: ${current[1]}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#322a2c]/80 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-lg"
            >
              <div className="relative max-h-[78vh] overflow-auto bg-[#f3ead8]">
                <img
                  src={`/assets/pagina-${current[0]}.webp`}
                  alt={`Página ${current[0]} — ${current[1]}`}
                  className="block h-auto w-full object-contain"
                />
              </div>
              <div className="flex items-start gap-3 border-t border-[#e7dcc8] p-4 sm:p-5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8c9ca]/50 text-xs font-bold text-[#650d25]">
                  {current[0]}
                </span>
                <div>
                  <p className="font-editorial text-base font-semibold text-[#650d25]">
                    {current[1]}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {current[2]}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
