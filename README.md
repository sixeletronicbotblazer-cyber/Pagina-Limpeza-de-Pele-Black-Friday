# Limpeza de Pele — Página de Vendas · Black Friday

Página de vendas para o curso **Limpeza de Pele** com **Natália Cavalcante**.
Construída em Next.js 16 + TypeScript + Tailwind CSS, com identidade visual editorial
(creme, bordô, rosé) e animações de "vibe coding".

## Stack

- **Next.js 16** (App Router) + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** para animações
- Fontes locais: Fira Sans + Editorial Serif

## O que está incluído

- Hero editorial com headline aprovada e mockups da apostila
- Seção de dores, prévias da apostila (galeria com marquee + lightbox)
- Caminho de aprendizado em 4 passos
- Simulação interativa de faturamento (calculadora)
- Para quem é, coleção, especialista (Natália)
- **Oferta Black Friday** com contagem regressiva por data absoluta
- FAQ em accordion nativo
- Fecho e rodapé
- **Notificações de compra** ilustrativas (verde, fade-in, "comprou agora")
- **Meta Pixel** configurado (PageView + eventos de CTA)

## Condições comerciais

Centralizadas em `src/lib/comercial.ts`:

```ts
export const CHECKOUT_URL = "";        // URL do checkout (vazio = aviso de prévia)
export const PRECO = "R$47";
export const BLACK_FRIDAY_FIM = "2026-10-13T23:59:00-03:00";
export const META_PIXEL_ID = "900080772936894";
```

Para conectar o checkout, edite `CHECKOUT_URL` e o botão da oferta passa a levar
direto ao pagamento externo.

## Desenvolvimento

```bash
bun install
bun run dev     # http://localhost:3000
bun run lint
```

## Estrutura

```
src/
  app/            # layout, page, globals
  components/
    sections/     # Hero, Pains, Gallery, Mechanism, Simulation,
                  # Audience, Collection, Expert, Offer, Faq, Closing, Footer
    FacebookPixel.tsx
    PurchaseNotifications.tsx
    CountdownTimer.tsx
    ScrollProgress.tsx
    CtaButton.tsx
  lib/
    content.ts     # copy centralizada
    comercial.ts   # condições da oferta
    buyers-data.ts # base de nomes/cidades das notificações
  hooks/
    use-reveal.ts  # reveal on scroll
public/assets/     # imagens e fontes
```

## Observações

- Material educativo. Resultados financeiros variam conforme prática, demanda e custos.
- As notificações de compra são **ilustrativas** — não são depoimentos nem resultados.
- Imagens geradas são cenas ilustrativas; o retrato da Natália foi criado a partir da capa aprovada.
