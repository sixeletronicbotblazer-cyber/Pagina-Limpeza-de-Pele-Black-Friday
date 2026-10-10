"use client";

import { useState } from "react";
import { trackPixel } from "@/components/FacebookPixel";
import { CHECKOUT_URL } from "@/lib/comercial";

interface CtaButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  event?: string;
  eventData?: Record<string, unknown>;
}

/**
 * Botão de CTA que dispara evento do Pixel e leva ao checkout.
 * Sem CHECKOUT_URL configurada, abre aviso de prévia.
 */
export function CtaButton({
  children,
  variant = "primary",
  href,
  className = "",
  event = "Lead",
  eventData,
}: CtaButtonProps) {
  const [notice, setNotice] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (event) trackPixel(event, eventData);
    if (!href) {
      e.preventDefault();
      setNotice(true);
      setTimeout(() => setNotice(false), 2600);
    }
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650d25] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7f0] min-h-[52px]";
  const styles =
    variant === "primary"
      ? "bg-[#650d25] text-[#fbf7f0] shadow-lg shadow-[#650d25]/20 hover:bg-[#7d1130] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#650d25]/30 active:translate-y-0"
      : "bg-white text-[#650d25] border border-[#650d25]/20 hover:border-[#650d25]/40 hover:bg-[#fbf7f0] hover:-translate-y-0.5";

  return (
    <span className="relative inline-flex">
      <a
        href={href || "#"}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </a>
      {notice && (
        <span
          role="status"
          className="absolute -bottom-12 left-1/2 z-20 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-[#e8c9ca] bg-white px-3 py-2 text-xs text-muted-foreground shadow-lg"
        >
          Em breve: o checkout será liberado pelo produtor.
        </span>
      )}
    </span>
  );
}
