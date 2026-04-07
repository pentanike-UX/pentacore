import { SubPageScaffold } from "@/components/layout/SubPageScaffold";

export default function InquiryPage() {
  return (
    <SubPageScaffold
      as="main"
      backgroundColor="#000000"
      className="min-h-dvh text-white"
      contentClassName="min-h-dvh px-6 pb-16 pt-[100px] md:px-10 md:pt-[124px]"
    >
      <h1 className="text-2xl font-bold">프로젝트 문의</h1>
      <p className="mt-4 text-white/70">TODO: 프로젝트 문의 드로어/폼</p>
    </SubPageScaffold>
  );
}
