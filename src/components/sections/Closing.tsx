"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";
import { CtaButton } from "@/components/CtaButton";
import CountdownTimer from "@/components/CountdownTimer";
import { CHECKOUT_URL, BLACK_FRIDAY_FIM } from "@/lib/comercial";

export default function Closing() {
  const { ref, visible } = useReveal();
  const c = content.closing;

  return (
    <section
      id="fecho"
      aria-label="Fecho"
      className="relative overflow-hidden bg-[#650d25] py-20 text-[#fbf7f0] sm:py-24"
    >
      {/* Fundo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-10 h-80 w-80 rounded-full bg-[#e8c9ca]/20 blur-3xl animate-drift" />
        <div
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#e8c9ca]/15 blur-3xl animate-drift"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="grain relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`reveal ${visible ? "is-visible" : ""}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#e8c9ca]">
            Comece hoje
          </p>
          <h2 className="font-editorial mt-3 text-3xl leading-[1.15] text-[#fbf7f0] sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#fbf7f0]/80">
            {c.text}
          </p>

          <div className="mt-8 flex justify-center">
            <CtaButton
              href={CHECKOUT_URL || "#oferta"}
              event="InitiateCheckout"
              eventData={{
                content_name: "Limpeza de Pele",
                value: 47,
                currency: "BRL",
              }}
              className="bg-[#fbf7f0] text-[#650d25] shadow-2xl hover:bg-white"
            >
              {c.cta}
            </CtaButton>
          </div>

          <div className="mt-8 flex justify-center">
            <CountdownTimer targetIso={BLACK_FRIDAY_FIM} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
