import { FaCalendarDay, FaRegHeart, FaTag } from 'react-icons/fa6'
import { Link } from '@/i18n/navigation'
import PageTransitionRunner from '@/components/PageTransitionRunner'
import { Metadata, ResolvingMetadata } from 'next'
import { getLocale, setRequestLocale } from 'next-intl/server'
import MdArticle from '@/components/MdArticle'
import { getPost } from './getPost'
import ShareButtons from './ShareButtons.client'
import CommentsSection from '@/components/comments/CommentsSection'
import { allPosts } from 'content-collections'
import ArticleLayout from '@/components/ArticleLayout'

export async function generateMetadata(
  { params }: PageProps<'/[locale]/posts/[slug]'>,
): Promise<Metadata> {
  const locale = await getLocale()
  const { slug } = await params

  const post = await getPost({
    locale, slug
  })

  return {
    title: post.title,
    description: post.description ?? post.excerpt,
    openGraph: {
    //  images: { url: `/generated-ogp/posts/wide_${post.locale}_${post.slug}.png` }
    },
    twitter: {
      card: "summary",
      //images: { url: `/generated-ogp/posts/square_${post.locale}_${post.slug}.png` },
      site: "@korange753"
    }
  }
}

export function generateStaticParams() {
  allPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return allPosts.map(post => ({
    locale: post.locale,
    slug: post.slug
  }))
}

export default async function PostPage({ params }: PageProps<'/[locale]/posts/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale);

  const post = await getPost({
    locale, slug
  })

  return ( <>
    <PageTransitionRunner />
    <ArticleLayout
      title={post.title}
      heroEmoji={post.emoji}
      badges={
        <>
          <div className="border-[#1388B9] text-[#1388B9] font-semibold text-[0.96rem] border-[3px] rounded-md py-0.5 px-1.75 flex items-center gap-1 group duration-200 transition-colors">
            <FaCalendarDay className="w-4 h-4" />{ new Date(post.createdAt).toLocaleDateString(locale) }
          </div>
          { (post.tags ?? []).map((tag, index) => ( tag &&
            <Link href={`/tags/${tag.id}`} key={index} className="cursor-pointer border-[#1388B9] text-[#1388B9] hover:bg-[#1388B9] hover:text-[#fdf6ee] font-semibold text-[0.96rem] border-[3px] rounded-md py-0.5 px-1.75 flex items-center gap-1 group duration-200 transition-colors">
              <FaTag className="w-4 h-4" />{ locale === "ja" ? ( tag.nameJa ?? tag.nameEn ) : ( tag.nameEn ) ?? tag.id }
            </Link>
          )) }
        </>
      }
      afterContent={
        <div className='flex items-end justify-between text-[#1388b9] mt-10 page_transition'>
          <div className='flex items-center text-lg gap-3'>
            <div className='border-2 border-[#1388b9] p-2 rounded-full duration-200 cursor-pointer hover:scale-104'>
              <FaRegHeart className='w-5 h-5' />
            </div>
            <div className=' leading-9'>12</div>
          </div>
          <div className='text-right'>
            <div className='text-xs font-bold opacity-60'>この記事をシェアする</div>
            <ShareButtons postTitle={post.title} />
          </div>
        </div>
      }
    >
      <MdArticle
        content={post.content}
        type="posts"
        locale={post.locale}
        slug={post.slug}
      />
    </ArticleLayout>

    <CommentsSection placeType="post" placeLocale={post.locale} placeSlug={post.slug} />
    
    <PageTransitionRunner />
  </> )
}
