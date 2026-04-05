import { notFound } from 'next/navigation'
import DashedContainerDivider from '@/components/article_components/dashedContainerDivider'
import { emojiToTwemojiUrl } from '@/utils/emojiToTwemojiUrl'

import { allPosts, allWorks } from 'content-collections'

import { FaFileCircleCheck, FaRocket, FaSquareArrowUpRight, FaTag } from 'react-icons/fa6'
import { Link } from '@/i18n/navigation'
import PageTransitionRunner from '@/components/PageTransitionRunner'
import { Metadata, ResolvingMetadata } from 'next'
import { getExtracted, getLocale } from 'next-intl/server'
import MdArticle from '@/components/MdArticle'
import Image from 'next/image'
import { SiTorbrowser, SiTorproject } from '@icons-pack/react-simple-icons'
import ArticleLayout from '@/components/ArticleLayout'

export default async function PostPage({ params }: PageProps<'/[locale]/onion'>) {
  const t = await getExtracted()

  return (
    <>
      <PageTransitionRunner />
      <ArticleLayout
        title={'利用規約'}
        heroIcon={FaFileCircleCheck}
      >
        <MdArticle content={`


          `} />
      </ArticleLayout>
    </>
  )
}
