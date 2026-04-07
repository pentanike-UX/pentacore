import type { Metadata } from "next";
import { Geist, Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GlobalCursorProvider } from "@/components/GlobalCursorProvider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

/** SUB_WORK HERO 영문 대형 타이틀 — Figma Inter Black */
const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-inter-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PENTACORE",
  description: "Pentacore crafts your future with technology and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        "dark font-sans",
        geist.variable,
        noto.variable,
        interDisplay.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans">
        <GlobalCursorProvider>{children}</GlobalCursorProvider>
      </body>
    </html>
  );
}
