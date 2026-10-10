"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X, CheckCircle2 } from "lucide-react";
import {
  BUYER_TIME_LABEL,
  getAvatarColor,
  getInitial,
  pickUniqueBuyer,
  type BuyerNotification,
} from "@/lib/buyers-data";

/**
 * Notificações de compra — ilustrativas.
 *
 * Regras:
 *  - Nome + cidade únicos por sessão (sem repetir a mesma pessoa).
 *  - Sempre capitais e cidades médias próximas (foco SP, MG, NE).
 *  - Entrada fade-in verde chamativa, "comprou agora".
 *  - Uma notificação por vez, fila com intervalo randomizado.
 */
export default function PurchaseNotifications() {
  const [current, setCurrent] = useState<BuyerNotification | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const usedRef = useRef<Set<string>>(new Set());
  const idRef = useRef(0);

  useEffect(() => {
    if (dismissed) return;

    let leaveTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      // Pequeno atraso inicial para a página respirar.
      const picked = pickUniqueBuyer(usedRef.current);
      if (!picked) return; // base esgotada — para de exibir
      usedRef.current.add(`${picked.name}|${picked.city}`);
      idRef.current += 1;
      setCurrent({ id: idRef.current, ...picked, at: Date.now() });
      setLeaving(false);

      // Tempo visível: 6.5s, depois fade out e próxima.
      leaveTimer = setTimeout(() => {
        setLeaving(true);
        nextTimer = setTimeout(() => {
          setCurrent(null);
          // Próxima notificação após intervalo randomizado 3.5–7.5s.
          nextTimer = setTimeout(showNext, 3500 + Math.random() * 4000);
        }, 500);
      }, 6500);
    };

    // Primeira notificação após 4s.
    const first = setTimeout(showNext, 4000);

    return () => {
      clearTimeout(first);
      clearTimeout(leaveTimer);
      clearTimeout(nextTimer);
    };
  }, [dismissed]);

  if (dismissed || !current) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 sm:left-5 sm:bottom-5 sm:right-auto sm:max-w-sm pointer-events-none"
    >
      <div
        key={current.id}
        className={`pointer-events-auto relative overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-[0_18px_50px_-18px_rgba(16,185,129,0.45)] ${
          leaving ? "purchase-exit" : "purchase-enter"
        }`}
      >
        {/* Faixa verde lateral */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-emerald-500 via-emerald-500 to-emerald-400"
        />

        {/* Glow verde de fundo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl"
        />

        <div className="flex items-start gap-3 p-3 pl-5 sm:p-4 sm:pl-6">
          {/* Avatar */}
          <div
            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-semibold ring-2 ring-emerald-100 ${getAvatarColor(
              current.name,
            )}`}
          >
            {getInitial(current.name)}
          </div>

          {/* Conteúdo */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-semibold text-[#322a2c]">
                {current.name}
              </span>
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 fill-emerald-100 text-emerald-600" />
            </div>

            <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-[#322a2c]">
              {current.offer}
            </p>

            <div className="mt-1.5 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-emerald-600" />
                <span className="truncate">{current.city}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                {BUYER_TIME_LABEL}
              </span>
            </div>
          </div>

          {/* Fechar */}
          <button
            type="button"
            aria-label="Fechar notificação"
            onClick={() => setDismissed(true)}
            className="-mr-1 -mt-1 shrink-0 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
