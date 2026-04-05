import ArticleCard from "@/components/cards/PostCard";
import PageTransitionRunner from "@/components/PageTransitionRunner";
import MainContentPx from "@/components/MainContentPx"
import { allPosts } from "content-collections";
import { getExtracted, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import PostCard from "@/components/cards/PostCard";

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale} = await params;
 
  return {
    title: locale === "ja" ? "書いた記事 | Korange" : "Writings | Korange",
    description: locale === "ja" ? "Korange がこのサイトや様々な場所で書いた記事の一覧です。" : "A list of articles written by Korange on this site and various other places.",
  };
}

export default async function WritingsPage({ params }: PageProps<'/[locale]/writings'>) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getExtracted()

  const writings = [
    ...allPosts.filter(post => post.locale === locale),
  ]

  const result = writings
    .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

  return (
    <>
      <PageTransitionRunner />
      <MainContentPx className="mt-12">
        <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">{t('書いたもの')}</h2>
        <div className="-mxa-1 sm:mx-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
          { result.map((post, i) => (
            <PostCard
              key={post._meta.path}
              post={post}
              className="page_transition"
            />
          )) }
        </div>
      </MainContentPx>
    </>
  );
}
