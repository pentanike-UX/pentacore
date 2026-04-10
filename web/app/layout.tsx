import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
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

/** 사이트 공통 — <title>, meta description/keywords, OG, Twitter 동일 */
const SITE_TITLE =
  "PENTACORE | IT·AI 개발부터 서비스 운영까지, 기술·디자인 스튜디오";

const SITE_DESCRIPTION =
  "현대자동차그룹·삼성 등 글로벌 파트너와 내비게이션, 인비히클, 웹, AI 서비스를 설계·개발·운영합니다. IT 컨설팅부터 구축, 연간운영까지 — 기술과 디자인으로 비즈니스의 핵심을 잇는 스튜디오형 팀, 펜타코어.";

const SITE_KEYWORDS =
  "PENTACORE,펜타코어,IT개발에이전시,AI개발,서비스운영,내비게이션,인비히클,IVI,모빌리티,웹개발,프로덕트디자인,자동차UX,IT컨설팅,연간운영,SaaS,플랫폼구축";

const OG_IMAGE_ALT =
  "PENTACORE - IT·AI 기술과 디자인으로 만드는 프로덕트 스튜디오";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pentacore.co.kr"),
  title: {
    default: SITE_TITLE,
    template: "%s | PENTACORE",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "PENTACORE",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: {
      url: "/twitter-image.png",
      alt: OG_IMAGE_ALT,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
