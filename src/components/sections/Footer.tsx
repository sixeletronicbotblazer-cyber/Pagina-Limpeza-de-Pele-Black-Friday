"use client";

import { content } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const f = content.footer;

  return (
    <footer className="mt-auto bg-[#322a2c] py-10 text-[#fbf7f0]/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-editorial text-lg text-[#fbf7f0]">{f.brand}</p>
          <span className="inline-flex items-center rounded-full border border-[#fbf7f0]/20 bg-[#fbf7f0]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#e8c9ca]">
            Black Friday antecipada
          </span>
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-[#fbf7f0]/60">
          {f.note}
        </p>

        <div className="mt-8 border-t border-[#fbf7f0]/10 pt-6">
          <div className="flex flex-col items-start justify-between gap-2 text-xs text-[#fbf7f0]/60 sm:flex-row sm:items-center">
            <p>© {year} Natália Cavalcante</p>
            <p>Material educativo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
