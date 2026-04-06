import type { Metadata } from "next";
import { Noto_Sans_KR, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
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
      className={cn("dark font-sans", geist.variable, noto.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
