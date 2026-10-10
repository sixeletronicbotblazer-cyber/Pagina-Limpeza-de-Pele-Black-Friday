"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra de progresso de leitura fixa no topo da página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-[#650d25]"
      style={{ scaleX }}
    />
  );
}
