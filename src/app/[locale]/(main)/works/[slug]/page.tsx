import { notFound } from 'next/navigation'
import DashedContainerDivider from '@/components/article_components/dashedContainerDivider'
import { emojiToTwemojiUrl } from '@/utils/emojiToTwemojiUrl'

import { allPosts, allWorks } from 'content-collections'

import { FaRocket, FaSquareArrowUpRight, FaTag } from 'react-icons/fa6'
import { Link } from '@/i18n/navigation'
import PageTransitionRunner from '@/components/PageTransitionRunner'
import { Metadata, ResolvingMetadata } from 'next'
import { getExtracted, getLocale, setRequestLocale } from 'next-intl/server'
import MdArticle from '@/components/MdArticle'
import Image from 'next/image'

export async function generateMetadata(
  { params }: PageProps<'/[locale]/works/[slug]'>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const locale = await getLocale()
  const { slug } = await params

  const work = allWorks.find(work => work.slug === slug)

  if (!work) {
    notFound();
  }

  return {
    title: (locale === "ja" ? work.name.ja || work.name.en : work.name.en || work.name.ja) + " | Korange",
    description: locale === "ja" ? work.description.ja || work.description.en : work.description.en || work.description.ja
  }
}

export default async function PostPage({ params }: PageProps<'/[locale]/works/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale);
  
  const work = allWorks.find(work => work.slug === slug)

  const t = await getExtracted()

  if (!work) {
    notFound()
  }

  return (
    <div className="min-h-screen md:mxx-2 rounded-t-[3rem] mt-10 flex flex-col"><div className='page_transition'>
      <div className="h-34 sm:h-45 bg-[#5CADCF] rounded-t-[2rem] sm:rounded-t-[3rem] flex flex-col justify-center relative overflow-hidden" style={{
        backgroundImage: work.coverBgCss ?? "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: work.coverBgCss ? "cover" : "870px",
        backgroundRepeat: work.coverBgCss && "no-repeat",
        backgroundPosition: work.coverBgCss && "center"
      }}>
        { work.coverBgImage && <Image fill src={work.coverBgImage} alt="" /> }
        { work.coverIcon && <div className="absolute inset-0" style={{
          top: work.coverPyPercent && Math.round(work.coverPyPercent * 1.125) + "%", // デカい表示だと余白多めのほうがよく見えるので少し足す
          bottom: work.coverPyPercent && Math.round(work.coverPyPercent * 1.125) + "%",
        }}>
          <div className="h-full relative">
            <Image fill src={work.coverIcon} alt={`${ locale === "ja" ? work.name.ja ?? work.name.en : work.name.en ?? work.name.ja } Icon`} className="absolute inset-0 w-auto object-contain" />
          </div>
        </div> }
      </div>
      <div className="py-9 px-[1.25rem] px--[1.5rem] sm:p-11 bg-[#FDF6EE] text-[#333333] rounded-b-[3rem] flex-1 mb-10">
        <div className="text-center">
          <h1 className="text-[1.75rem] page_transition">{locale === "ja" ? work.name.ja || work.name.en : work.name.en || work.name.ja}</h1>
          <div className="mt-4 flex justify-center gap-2 page_transition">
            { work.siteUrl && <Link href={work.siteUrl} className="cursor-pointer border-[#1388B9] bg-[#1388B9] text-[#fdf6ee] font-semibold text-[0.96rem] border-[3px] rounded-md py-0.5 px-1.75 flex items-center gap-1 group duration-200 transition-colors">
              <FaSquareArrowUpRight className="w-4 h-4" />{t('サイトを見る')}
            </Link> }
            { work.releasedAt && <div className="border-[#1388B9] text-[#1388B9] font-semibold text-[0.96rem] border-[3px] rounded-md py-0.5 px-1.75 flex items-center gap-1 group">
              <FaRocket className="w-4 h-4" />{new Date(work.releasedAt).toLocaleDateString(locale)}
            </div> }
          </div>
          <DashedContainerDivider className="mt-8 mx-4 sm:mx-8 page_transition" />
        </div>
    
        { ( work.content && ( work.content.ja || work.content.en ) ) && <article className="mt-10 articleContent page_transition">
          <MdArticle content={locale === "ja" ? work.content.ja || work.content.en : work.content.en || work.content.ja} />
        </article> }
      </div>
      </div>

      <PageTransitionRunner />
    </div>
  )
}
