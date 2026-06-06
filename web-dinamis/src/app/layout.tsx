import type { Metadata } from "next";
import { Cinzel_Decorative, Cinzel, IM_Fell_English } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-title",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-head",
});

const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Iron & Blade — Tempat Lahirnya Legenda",
  description: "Iron & Blade — Pandai besi legendaris sejak zaman kegelapan. Senjata ditempa dari baja terkuat untuk pahlawan sejati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cinzelDecorative.variable} ${cinzel.variable} ${imFellEnglish.variable}`}
        suppressHydrationWarning
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
