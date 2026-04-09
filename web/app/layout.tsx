import type { Metadata } from "next";
import { Geist, Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GlobalCursorProvider } from "@/components/GlobalCursorProvider";
import { AppChrome } from "@/components/layout/AppChrome";
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
  metadataBase: new URL("https://www.pentacore.co.kr"),
  title: {
    default: "PENTACORE | 내비·인비히클·웹 · 기술·디자인 스튜디오",
    template: "%s | PENTACORE",
  },
  description:
    "자동차·엔터프라이즈 파트너와 내비게이션, 인비히클, 웹을 설계·개발하는 스튜디오형 팀. 기술과 디자인으로 신뢰와 혁신을 잇습니다.",
  keywords: [
    "PENTACORE",
    "펜타코어",
    "내비게이션",
    "인비히클",
    "IVI",
    "모빌리티",
    "프로덕트 디자인",
    "자동차 UX",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "PENTACORE",
    title: "PENTACORE | 내비·인비히클·웹 · 기술·디자인 스튜디오",
    description:
      "자동차·엔터프라이즈 파트너와 내비게이션, 인비히클, 웹을 설계·개발하는 스튜디오형 팀. 기술과 디자인으로 신뢰와 혁신을 잇습니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PENTACORE | 내비·인비히클·웹 · 기술·디자인 스튜디오",
    description:
      "자동차·엔터프라이즈 파트너와 내비게이션, 인비히클, 웹을 설계·개발하는 스튜디오형 팀. 기술과 디자인으로 신뢰와 혁신을 잇습니다.",
  },
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
        <GlobalCursorProvider>
          <AppChrome>{children}</AppChrome>
        </GlobalCursorProvider>
      </body>
    </html>
  );
}
