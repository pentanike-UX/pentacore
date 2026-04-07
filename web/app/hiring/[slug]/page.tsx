import { notFound } from "next/navigation";
import { HiringJobDetailView } from "@/components/hiring/HiringJobDetailView";
import { HIRING_JOB_SLUG_BACKEND } from "@/components/hiring/hiring-assets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [{ slug: HIRING_JOB_SLUG_BACKEND }];
}

export default async function HiringJobPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== HIRING_JOB_SLUG_BACKEND) {
    notFound();
  }
  return <HiringJobDetailView />;
}
