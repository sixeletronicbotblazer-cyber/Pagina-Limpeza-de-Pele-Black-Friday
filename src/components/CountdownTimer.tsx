"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

function diff(target: number): TimeLeft {
  const now = Date.now();
  const ms = target - now;
  if (ms <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  return { days, hours, minutes, seconds, ended: false };
}

const PLACEHOLDER: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false };

/**
 * Contagem regressiva contínua por data absoluta. Não reinicia por visita.
 * Renderiza um placeholder estável no SSR e o valor real após montar
 * (evita mismatch de hidratação por diferença de relógio servidor/cliente).
 */
export default function CountdownTimer({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [time, setTime] = useState<TimeLeft>(PLACEHOLDER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      setTime(diff(target));
    });
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [target]);

  if (mounted && time.ended) {
    return (
      <p className="text-sm text-muted-foreground">
        A condição antecipada de Black Friday foi encerrada.
      </p>
    );
  }

  const items: [number, string][] = [
    [time.days, "dias"],
    [time.hours, "horas"],
    [time.minutes, "min"],
    [time.seconds, "seg"],
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3" aria-live="polite" aria-atomic="true">
      {items.map(([v, label], i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center rounded-xl border border-[#e8c9ca] bg-white px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm min-w-[3.25rem]">
            <span className="font-editorial text-xl sm:text-2xl font-semibold tabular-nums text-[#650d25] leading-none">
              {String(v).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="font-semibold text-[#650d25]/50">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
