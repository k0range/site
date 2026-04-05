import PageTransitionRunner from "@/components/PageTransitionRunner";
import { getExtracted, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import WorkCard from "@/components/cards/WorkCard";
import MainContentPx from "@/components/MainContentPx";
import { allWorks } from "content-collections";

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale} = await params;
 
  return {
    title: locale === "ja" ? "作ったもの | Korange" : "Works | Korange",
    description: locale === "ja" ? "Korange が作ったものや公開しているものの一覧です。" : "A list of things created and published by Korange.",
  };
}

export default async function WorksPage({ params }: PageProps<'/[locale]/works'>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getExtracted()

  return (
    <>
      <MainContentPx className="mt-12">
        <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">{t('作ったもの')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          { allWorks.sort((a, b) => a.order - b.order).map(work => (
            <WorkCard
              key={work._meta.fileName}
              work={work}
              className="page_transition"
            />
          )) }  
        </div>
      </MainContentPx>

      <PageTransitionRunner />
    </>
  );
}
