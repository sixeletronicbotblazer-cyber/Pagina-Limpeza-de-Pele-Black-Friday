import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import FacebookPixel from "@/components/FacebookPixel";

const fira = localFont({
  src: [
    { path: "../../public/assets/fonts/fira-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/fira-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/fira-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/assets/fonts/fira-sans-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/assets/fonts/fira-sans-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-fira",
  display: "swap",
});

const editorial = localFont({
  src: "../../public/assets/fonts/editorial-serif.ttf",
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Limpeza de Pele com Natália Cavalcante | Comece do zero",
  description:
    "Aprenda limpeza de pele do zero e dê o primeiro passo para ganhar dinheiro com seus próprios atendimentos. Apostila ilustrada de 54 páginas, aulas introdutórias e certificado por R$47, pagamento único.",
  keywords: [
    "limpeza de pele",
    "curso de limpeza de pele",
    "estética",
    "apostila de limpeza de pele",
    "Natália Cavalcante",
    "curso de estética",
  ],
  authors: [{ name: "Natália Cavalcante" }],
  icons: {
    icon: "/assets/favicon.svg",
  },
  openGraph: {
    title: "Limpeza de Pele com Natália Cavalcante | Comece do zero",
    description:
      "Aprenda limpeza de pele do zero. Apostila ilustrada, aulas introdutórias e certificado por R$47, pagamento único.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#650d25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${fira.variable} ${editorial.variable} antialiased bg-background text-foreground`}
      >
        <FacebookPixel />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
