"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Coins, Calendar, Users, Sparkles } from "lucide-react";
import { content } from "@/lib/content";
import { useReveal } from "@/hooks/use-reveal";
import { CtaButton } from "@/components/CtaButton";
import { Slider } from "@/components/ui/slider";

const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export default function Simulation() {
  const s = content.simulation;
  const { ref, visible } = useReveal();

  const [price, setPrice] = useState<number>(s.defaults.price);
  const [clients, setClients] = useState<number>(s.defaults.clients);
  const [days, setDays] = useState<number>(s.defaults.days);

  const target = price * clients * days;
  const [display, setDisplay] = useState<number>(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(target);

  // Tween animated counter toward target
  useEffect(() => {
    const start = startRef.current;
    const diff = target - start;
    if (diff === 0) return;
    const duration = 600;
    const startTs = performance.now();
    const step = (ts: number) => {
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const next = Math.round(start + diff * eased);
      setDisplay(next);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        startRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  const applyPreset = (p: { price: number; clients: number; days: number }) => {
    setPrice(p.price);
    setClients(p.clients);
    setDays(p.days);
  };

  return (
    <section
      id="simulacao"
      aria-label="Simulação de faturamento"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#e8c9ca]/30 blur-3xl animate-drift" />
        <div
          className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#d9b48a]/25 blur-3xl animate-drift"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} text-center`}>
          <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[#650d25]">
            Pitch e simulação
          </p>
          <h2 className="font-editorial mt-3 mx-auto max-w-3xl text-3xl leading-[1.1] text-[#322a2c] sm:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            {s.text}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#e7dcc8] bg-white p-6 shadow-xl shadow-[#650d25]/5 sm:p-8 lg:p-10">
          {/* Big result */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Faturamento bruto mensal simulado
            </p>
            <p className="font-editorial shimmer-text mt-2 text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
              {fmtBRL(display)}
            </p>
          </div>

          {/* Presets */}
          <div className="mt-7 flex flex-col items-stretch justify-center gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => applyPreset(s.defaults)}
              className="flex min-h-[44px] items-center justify-center rounded-xl border border-[#650d25]/25 bg-[#fbf7f0] px-4 py-2 text-sm font-semibold text-[#650d25] transition hover:-translate-y-0.5 hover:border-[#650d25]/50 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650d25] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7f0]"
            >
              R${s.defaults.price} × {s.defaults.clients} × {s.defaults.days}
              <span className="ml-1 text-muted-foreground">·</span>
              <span className="ml-1 text-xs font-normal text-muted-foreground">ponto de partida</span>
            </button>
            <button
              type="button"
              onClick={() => applyPreset(s.alt)}
              className="flex min-h-[44px] items-center justify-center rounded-xl border border-[#650d25]/25 bg-[#fbf7f0] px-4 py-2 text-sm font-semibold text-[#650d25] transition hover:-translate-y-0.5 hover:border-[#650d25]/50 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650d25] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7f0]"
            >
              R${s.alt.price} × {s.alt.clients} × {s.alt.days}
              <span className="ml-1 text-muted-foreground">·</span>
              <span className="ml-1 text-xs font-normal text-muted-foreground">cenário otimista</span>
            </button>
          </div>

          {/* Sliders */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <SliderField
              icon={<Coins className="h-4 w-4" />}
              label="Preço por atendimento"
              suffix="R$"
              value={price}
              min={30}
              max={300}
              step={5}
              onChange={setPrice}
              format={(v) => String(v)}
            />
            <SliderField
              icon={<Users className="h-4 w-4" />}
              label="Clientes por dia"
              value={clients}
              min={1}
              max={12}
              step={1}
              onChange={setClients}
              format={(v) => String(v)}
            />
            <SliderField
              icon={<Calendar className="h-4 w-4" />}
              label="Dias por mês"
              value={days}
              min={4}
              max={30}
              step={1}
              onChange={setDays}
              format={(v) => String(v)}
            />
          </div>

          {/* Disclaimer */}
          <div className="mt-8 flex items-start gap-2 rounded-xl bg-[#e8c9ca]/25 p-3 text-xs leading-relaxed text-muted-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#650d25]" />
            <p>
              Faturamento bruto não é lucro. Resultados dependem de custos,
              demanda, prática e clientela.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-7 flex justify-center">
            <CtaButton
              href="#oferta"
              event="InitiateCheckout"
              eventData={{
                content_name: "Limpeza de Pele",
                value: 47,
                currency: "BRL",
              }}
              className="animate-pulse-ring"
            >
              Quero começar a estudar
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SliderFieldProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  suffix?: string;
}

function SliderField({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  suffix,
}: SliderFieldProps) {
  return (
    <div className="rounded-2xl border border-[#e7dcc8] bg-[#fbf7f0] p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#650d25]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#e8c9ca]/60">
            {icon}
          </span>
          {label}
        </span>
      </div>
      <p className="font-editorial mt-3 text-2xl font-semibold text-[#322a2c]">
        {suffix ? `${suffix} ` : ""}
        {format(value)}
      </p>
      <Slider
        className="mt-4"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        aria-label={label}
      />
      <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>{suffix ? `${suffix} ` : ""}{format(min)}</span>
        <span>{suffix ? `${suffix} ` : ""}{format(max)}</span>
      </div>
    </div>
  );
}
