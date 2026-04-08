"use client";

import Image from "next/image";
import { SubPageScaffold } from "@/components/layout/SubPageScaffold";
import { SubWorkStyleHero } from "@/components/subpages/SubWorkStyleHero";
import { cn } from "@/lib/utils";
import { SUB_WORK_PAGE_BG } from "@/lib/figma-liquid-glass";
import {
  ABOUT_COMPANY_PROFILE_BG,
  ABOUT_COMPANY_PROFILE_PDF,
  ABOUT_EDITORIAL_IMAGE,
  ABOUT_FULL_IMAGES,
  ABOUT_PARTNER_COUNT,
  aboutPartnerIntrinsic,
  aboutPartnerSrc,
} from "./about-assets";

const ABOUT_TXT_EN =
  "Pentacore is a small studio-shaped team building navigation, in-vehicle, and web products with automotive and enterprise partners.";

const ABOUT_TXT_KO =
  "펜타코어는 자동차·엔터프라이즈 파트너와 함께 내비게이션, 인비히클, 웹 프로덕트를 만드는 스튜디오형 팀입니다.";

/** 본문 `<p>` — 서브페이지 본문 톤에 맞춤 */
const bodyClass =
  "whitespace-pre-line text-[15px] font-normal leading-relaxed text-zinc-800 md:text-base md:leading-relaxed";

/** 하이라이트 섹션 제목 — `h2`, 디스플레이·클램프 */
const highlightHeadingClass =
  "font-display text-[clamp(1.75rem,4.5vw,3rem)] font-semibold uppercase leading-[1.08] tracking-tight text-zinc-950";

const GUTTER = "px-6 md:px-[76px]";

/** 풀블리드 이미지 — 위·아래 10rem (`my-40`) */
function AboutFullBleedImage({
  src,
  width,
  height,
  alt = "",
}: {
  src: string;
  width: number;
  height: number;
  alt?: string;
}) {
  return (
    <figure
      className="relative left-1/2 my-40 w-screen max-w-[100vw] -translate-x-1/2"
      data-figma="SUB_ABOUT full_bleed"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes="100vw"
        unoptimized
      />
    </figure>
  );
}

const INTRO_PARAGRAPHS = [
  `모든 혁신의 여정은 
핵심, 즉 비즈니스, 비전, 꿈의 본질을 
관통하는 것에서 시작된다고 믿습니다.`,
  `이 핵심에서 모든 연결은 
기술의 정밀함과 디자인의 따뜻함으로 빚어낸 
특별한 경험으로 꽃피웁니다.`,
  `펜타코어는 글로벌 IT 및 AI 컨설팅 기업으로서, 
고객의 꿈의 핵심을 공감하고 지속 가능하며 
영감을 주는 경험으로 엮어내는 데 전념합니다.`,
] as const;

const PHILOSOPHY_PARAGRAPHS = [
  `펜타코어의 철학은 
진정으로 중요한 것이 무엇인지 이해하는 데 뿌리를 두고 있습니다.`,
  `고객의 과제와 직원들의 열망의 핵심을 깊이 파고듭니다.`,
  `본질을 중시하는 이러한 노력은 현대자동차그룹, 
삼성전자와 같은 글로벌 선도 기업과의 파트너십을 통해 이어졌으며, 
AI 분야의 실험적 활동의 원동력이 되었습니다.`,
  `기본에 충실함으로써 혁신적일 뿐만 아니라 
의미 있는 솔루션을 개발하여 기업의 번영을 지원하고 
의미 있는 경험을 통해 삶을 풍요롭게 합니다.`,
] as const;

const PHILOSOPHY_COLS = [
  "col-span-12 lg:col-start-1 lg:col-span-6",
  "col-span-12 lg:col-start-7 lg:col-span-4 lg:mt-40",
  "col-span-12 lg:col-start-2 lg:col-span-7 lg:mt-40",
  "col-span-12 lg:col-start-5 lg:col-span-6 lg:mt-40",
] as const;

const MISSION_PARAGRAPHS = [
  `펜타코어는 
기술을 목적지가 아닌 
다리로 생각합니다.`,
  `우리의 기술은 
IT와 AI를 활용하여 
오늘날의 현실과 미래의 가능성을 연결하고, 
실용적이면서도 심오한 경험을 
디자인하는 데 있습니다.`,
  `복잡한 비즈니스 과제를 해결하든, 
차세대 혁신가들에게 영감을 불어넣든, 
우리는 모든 상호작용의 핵심을 건드리고 
미래를 형성하는 지속적인 영향을 남기는 것을 목표로 합니다.`,
] as const;

const MISSION_COLS = [
  "col-span-12 lg:col-start-2 lg:col-span-5",
  "col-span-12 lg:col-start-6 lg:col-span-5 lg:mt-40",
  "col-span-12 lg:col-start-3 lg:col-span-8 lg:mt-40",
] as const;

const COMPANY_PROFILE_BODY = `펜타코어는 IT와 AI, 디자인을 관통하는 전문성을 바탕으로
기업과 고객의 핵심을 연결하며 의미 있는 경험을 창출합니다.`;

/** Partners 하단 — img_about5 배경(cover·center), 뷰포트별 종횡비: 모바일=이미지 전체, 태블릿=중간, 데스크=구 img_about4(1024×415) 비율 */
function AboutCompanyProfileBanner() {
  return (
    <section
      className="relative left-1/2 mt-20 w-screen max-w-[100vw] -translate-x-1/2 pb-0 md:mt-24"
      aria-labelledby="about-company-profile-heading"
      data-figma="SUB_ABOUT company_profile"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-zinc-900",
          "aspect-[576/1024] md:aspect-[3/2] lg:aspect-[1024/415]",
        )}
        style={{
          backgroundImage: `url(${ABOUT_COMPANY_PROFILE_BG.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 bg-zinc-950/55"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[min(52vh,520px)] flex-col items-center justify-center px-6 py-16 text-center md:min-h-0 md:py-20 lg:py-24">
          <Image
            src="/about/PF_05_fill.svg"
            alt=""
            width={83}
            height={63}
            className="h-[52px] w-auto opacity-95 md:h-14"
            unoptimized
          />
          <h2
            id="about-company-profile-heading"
            className="mt-8 font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold uppercase leading-tight tracking-tight text-white"
          >
            Company Profile
          </h2>
          <p className="mt-6 max-w-lg whitespace-pre-line text-[15px] leading-relaxed text-white/90 md:text-[17px] md:leading-relaxed">
            {COMPANY_PROFILE_BODY}
          </p>
          <a
            href={ABOUT_COMPANY_PROFILE_PDF}
            download
            className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-10 py-3.5 text-[16px] font-semibold text-zinc-950 underline decoration-2 decoration-zinc-950 underline-offset-[6px] transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            회사소개서
          </a>
        </div>
      </div>
    </section>
  );
}

export function AboutListingPage() {
  return (
    <SubPageScaffold
      as="main"
      backgroundColor={SUB_WORK_PAGE_BG}
      className="flex min-h-dvh flex-col text-zinc-950 antialiased"
      contentClassName="flex min-h-dvh flex-col"
      data-figma="SUB_ABOUT"
    >
      <SubWorkStyleHero
        label="(ABOUT)"
        line1="Small team."
        line2="Big surfaces."
        bodyEn={ABOUT_TXT_EN}
        bodyKo={ABOUT_TXT_KO}
      />

      {/* 히어로 직후 — 참고 레이아웃: 좌측 img_about1 비율 유지, 4–7열 겹침 영문, 한글 스태거 */}
      <section
        className={cn("mx-auto w-full max-w-[1280px] py-40", GUTTER)}
        aria-label="소개 문단"
        data-figma="SUB_ABOUT creative_opening"
      >
        <div className="grid grid-cols-12 gap-x-5 md:gap-x-8">
          <div className="col-span-12 lg:col-span-6 lg:row-start-1">
            <Image
              src={ABOUT_EDITORIAL_IMAGE.src}
              alt=""
              width={ABOUT_EDITORIAL_IMAGE.width}
              height={ABOUT_EDITORIAL_IMAGE.height}
              className="h-auto w-full max-w-full object-contain object-left"
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
            />
          </div>
          <p
            className={cn(
              "col-span-12 z-10 max-w-xl text-xl font-semibold leading-snug text-zinc-950 md:text-2xl",
              "mt-10 lg:col-start-4 lg:col-span-4 lg:row-start-1 lg:mt-0 lg:self-center",
            )}
          >
            Every meaningful experience starts with understanding.
          </p>
          <div
            className={cn(
              "col-span-12 space-y-2",
              "mt-40 lg:col-start-8 lg:col-span-5 lg:row-start-2 lg:mt-0",
            )}
          >
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
              Where experience begins.
            </p>
            <p className={bodyClass}>{INTRO_PARAGRAPHS[0]}</p>
          </div>
          <p
            className={cn(
              bodyClass,
              "col-span-12 mt-40 lg:col-start-6 lg:col-span-5 lg:row-start-3 lg:mt-40",
            )}
          >
            {INTRO_PARAGRAPHS[1]}
          </p>
          <p
            className={cn(
              bodyClass,
              "col-span-12 mt-40 lg:col-start-9 lg:col-span-4 lg:row-start-4 lg:mt-40",
            )}
          >
            {INTRO_PARAGRAPHS[2]}
          </p>
        </div>
      </section>

      <AboutFullBleedImage {...ABOUT_FULL_IMAGES.beforePhilosophy} />

      <section
        className={cn("mx-auto w-full max-w-[1280px] py-40", GUTTER)}
        aria-labelledby="about-philosophy"
        data-figma="SUB_ABOUT philosophy"
      >
        <h2 id="about-philosophy" className={highlightHeadingClass}>
          Our Philosophy
        </h2>
        <div className="mt-40 grid grid-cols-12 gap-x-5 md:gap-x-8">
          {PHILOSOPHY_PARAGRAPHS.map((text, i) => (
            <p key={i} className={cn(bodyClass, PHILOSOPHY_COLS[i])}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <AboutFullBleedImage {...ABOUT_FULL_IMAGES.beforeMission} />

      <section
        className={cn("mx-auto w-full max-w-[1280px] py-40", GUTTER)}
        aria-labelledby="about-mission"
        data-figma="SUB_ABOUT mission"
      >
        <h2 id="about-mission" className={highlightHeadingClass}>
          Our Mission
        </h2>
        <div className="mt-40 grid grid-cols-12 gap-x-5 md:gap-x-8">
          {MISSION_PARAGRAPHS.map((text, i) => (
            <p key={i} className={cn(bodyClass, MISSION_COLS[i])}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <section
        className={cn("mx-auto w-full max-w-[1280px] pt-40 pb-0", GUTTER)}
        aria-labelledby="about-partners"
        data-figma="SUB_ABOUT partners"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="about-partners" className={highlightHeadingClass}>
              Partners
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 gap-y-24 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-24 md:grid-cols-3 md:gap-x-8 md:gap-y-24">
              {Array.from({ length: ABOUT_PARTNER_COUNT }, (_, i) => i + 1).map(
                (n) => {
                  const { width, height } = aboutPartnerIntrinsic(n);
                  return (
                    <div
                      key={n}
                      className="flex items-center justify-center"
                    >
                      <Image
                        src={aboutPartnerSrc(n)}
                        alt={`파트너 로고 ${n}`}
                        width={width}
                        height={height}
                        sizes="(max-width: 1023px) 160px, 200px"
                        className={cn(
                          "h-auto w-auto object-contain",
                          /* 모바일·태블릿: 비율 유지 채로 표시만 축소 — lg 이상은 8컬 그리드 폭 내 자연 크기 */
                          "max-w-[min(100%,9.5rem)] sm:max-w-[min(100%,10.5rem)] md:max-w-[min(100%,11.75rem)] lg:max-w-full",
                        )}
                        unoptimized
                      />
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      <AboutCompanyProfileBanner />
    </SubPageScaffold>
  );
}
