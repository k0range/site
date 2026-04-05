import { MDXRemote, MDXRemoteOptions } from 'next-mdx-remote-client/rsc'
import DashedContainerDivider from '@/components/article_components/dashedContainerDivider'

import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypePrettyCode from 'rehype-pretty-code'
import CustomPre from '@/components/article_components/customPre'
import { rehypeMermaid } from '@/lib/mdPlugins/rehypeMermaid'
import Mermaid from '@/components/article_components/mermaid'
import { rehypeLinkCard } from '@/lib/mdPlugins/rehypeLinkCard'
import LinkCard from '@/components/article_components/linkCard'
import CustomImg from '@/components/article_components/customImg'
import Tweet from '@/components/Tweet'
import { remarkXEmbed } from '../lib/mdPlugins/remarkXEmbed'
import { remarkHighlight } from '../lib/mdPlugins/remarkHighlight'

import { FaChevronDown, FaChevronRight, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6'
import Callout from './Callout'
import { remarkCallout } from '../lib/mdPlugins/remarkCallout'
import { remarkImagePath } from '../lib/mdPlugins/remarkImagePath'

export default async function MdArticle({ content, type, locale, slug }: {
  content: string;
  type?: "posts" | "works";
  locale?: string;
  slug?: string;
}) {
  const components = {
    hr: () => <DashedContainerDivider className="mx-8 mt-12 mb-14" />,
    pre: CustomPre,
    Mermaid: Mermaid,
    LinkCard: LinkCard,
    img: (props) => <CustomImg
      {...props}
      type={type}
      locale={locale}
      slug={slug}
    />,

    FaTriangleExclamation: FaTriangleExclamation,
    FaCircleExclamation,
    FaCircleInfo,
    FaChevronRight,
    FaChevronDown,

    Callout: Callout,
    Highlight: (props) => <span className="text-[#1388b9] font-bold" {...props} />,
    Tweet: (props) => <Tweet {...props} border={true} />
  }

  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [
        [
          remarkImagePath,
          {
            absolutePath: `/content-assets/${type}/${locale ? `${locale}/` : ''}${slug}/`
          }
        ],

        remarkGfm,
        remarkDirective,

        remarkXEmbed,
        remarkHighlight,
        remarkCallout
      ],
      rehypePlugins: [
        rehypeMermaid,
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            keepBackground: true,
          },
        ],
        rehypeLinkCard
      ]
    },
  }

  return (
    <MDXRemote source={content} components={components} options={options} />
  )
}
