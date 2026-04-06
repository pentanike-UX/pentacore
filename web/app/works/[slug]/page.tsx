import { notFound } from "next/navigation";
import { WorksDetailView } from "@/components/work/WorksDetailView";
import { WORK_DETAIL_SLUG } from "@/components/work/work-assets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [{ slug: WORK_DETAIL_SLUG }];
}

export default async function WorksCasePage({ params }: Props) {
  const { slug } = await params;
  if (slug !== WORK_DETAIL_SLUG) {
    notFound();
  }
  return <WorksDetailView />;
}
