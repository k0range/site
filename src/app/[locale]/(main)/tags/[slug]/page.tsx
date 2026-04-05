import ArticleCard from "@/components/cards/PostCard";
import DashedContainerDivider from "@/components/article_components/dashedContainerDivider";
import PageTransitionRunner from "@/components/PageTransitionRunner";
import { emojiToTwemojiUrl } from "@/utils/emojiToTwemojiUrl";
import { allPosts, allTags } from "content-collections";
import { Metadata } from "next";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FaTag } from "react-icons/fa6";
import PostCard from "@/components/cards/PostCard";

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale, slug} = await params;
  
  const tag = allTags.find(t => t.id === slug);
  if (!tag) {
    notFound()
  }
 
  return {
    title: locale === "ja" ? `${tag.nameJa ?? tag.nameEn} タグの記事 | Korange` : `Articles tagged with ${tag.nameEn} | Korange`,
    description: locale === "ja" ? `「${tag.nameJa ?? tag.nameEn}」タグがついている記事` : `"${tag.nameEn}"`,
  };
}

export default async function TagPage({ params }: PageProps<'/[locale]/tags/[slug]'>) {
  const { slug } = await params;
  const locale = await getLocale()

  const tag = allTags.find(t => t.id === slug);

  if (!tag) {
    notFound()
  }

  const result = allPosts
    .filter(post => post._meta.path.startsWith("ja\\"))
    .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

  return (
    <>
      <div className="mt-12">
        <h2 className="flex items-center text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition"><FaTag className="inline mr-2.5" />{
          locale === "ja" ? ( tag.nameJa ?? tag.nameEn ) : ( tag.nameEn )
        }</h2>
        <div className="grid grid-cols-3 gap-4">
          { result.map((post, i) => (
            <PostCard
              key={i}
              post={post}
              className="page_transition"
            />
          )) }
        </div>
      </div>

      <PageTransitionRunner />
    </>
  );
}
