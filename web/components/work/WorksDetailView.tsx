"use client";

import Link from "next/link";
import { HeaderBar } from "@/components/home/HeaderBar";
import { BorderedVerticalLoop } from "./BorderedVerticalLoop";
import { ParallaxLayer, ParallaxViewport } from "./Parallax";
import { workImages } from "./work-assets";

/**
 * Figma `/works_view` — 12 컬럼 그리드 + 페럴렉스 + sec_4/sec_5 보더 루프
 */
export function WorksDetailView() {
  return (
    <main className="bg-black text-white">
      <HeaderBar compact={false} />
      <div className="border-b border-white/10 px-4 py-4 md:px-8">
        <Link
          href="/work"
          className="text-sm text-white/60 transition hover:text-white"
        >
          ← WORK 목록
        </Link>
      </div>

      <article className="mx-auto max-w-[1280px] px-4 pb-32 pt-12 md:px-6 md:pt-16">
        <ParallaxViewport yRange={[0, -24]} className="mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-white/45">
            Case study
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            현대자동차 그룹 내비게이션 업데이트
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65">
            공식 홈페이지 구축 및 연간 운영. 아래 섹션은 12 그리드 기준 배치와
            스크롤 시차, 그리고 Figma에 명시된 보더 고정 + 내부 이미지 루프를
            반영한 플레이스홀더입니다.
          </p>
        </ParallaxViewport>

        <div className="grid grid-cols-12 gap-x-4 gap-y-12 md:gap-x-6">
          <ParallaxLayer
            yRange={[32, -32]}
            className="col-span-12 lg:col-span-8"
          >
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 md:p-10">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                그리드 12 — 본문은 8칸 차지. 좌측 메인 컬럼에 텍스트와 이미지를
                배치합니다.
              </p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            yRange={[48, -48]}
            className="col-span-12 lg:col-span-4"
          >
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-sm font-semibold text-white/80">Meta</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/55">
                <li>역할: UX · UI · 구축</li>
                <li>클라이언트: 현대자동차 그룹</li>
                <li>범위: 구축 / 연간운영</li>
              </ul>
            </div>
          </ParallaxLayer>

          <div
            className="col-span-12 border-t border-white/10 pt-16"
            data-figma="sec_4"
          >
            <h2 className="mb-10 text-lg font-semibold text-white/85">
              sec_4 — 보더 11px 루프
            </h2>
            <div className="grid grid-cols-12 gap-8 lg:gap-10">
              <ParallaxLayer
                yRange={[24, -24]}
                className="col-span-12 md:col-span-6"
              >
                <p className="mb-4 text-xs text-white/45">
                  ST-FO-005_BIC_m / ST-FO-005_BIC_m_full
                </p>
                <BorderedVerticalLoop
                  borderWidth={11}
                  aspectRatio="324/800"
                  src={workImages.loop005}
                  alt=""
                  slowDuration={13}
                  fastDuration={2.8}
                />
              </ParallaxLayer>
              <ParallaxLayer
                yRange={[40, -40]}
                className="col-span-12 md:col-span-6"
              >
                <p className="mb-4 text-xs text-white/45">
                  ST-FO-030_m / ST-FO-024_m_full
                </p>
                <BorderedVerticalLoop
                  borderWidth={11}
                  aspectRatio="324/800"
                  src={workImages.loop024}
                  alt=""
                  slowDuration={11}
                  fastDuration={3}
                />
              </ParallaxLayer>
            </div>
          </div>

          <div
            className="col-span-12 border-t border-white/10 pt-16"
            data-figma="sec_5"
          >
            <ParallaxLayer yRange={[20, -20]} className="mb-8">
              <h2 className="text-lg font-semibold text-white/85">
                sec_5 — ST-FO-111 (보더 20px)
              </h2>
              <p className="mt-2 text-sm text-white/50">
                ST-FO-111_full 그룹 루프
              </p>
            </ParallaxLayer>
            <ParallaxLayer yRange={[36, -36]} className="mx-auto max-w-[898px]">
              <BorderedVerticalLoop
                borderWidth={20}
                aspectRatio="898/686"
                src={workImages.loop111}
                alt=""
                slowDuration={16}
                fastDuration={3.5}
              />
            </ParallaxLayer>
          </div>
        </div>
      </article>
    </main>
  );
}
