import DashedContainerDivider from '@/components/article_components/dashedContainerDivider'

import { FaCreativeCommons } from 'react-icons/fa6'
import PageTransitionRunner from '@/components/PageTransitionRunner'
import MdArticle from '@/components/MdArticle'

// ライセンスは検討中！！！現在の内容（CC）はサンプルみたいなもので効力を持ちません！
// CC BYが有力ですがまだ決まってません！！！！！
// 近日中にちゃんと決めます！！！！！

// === 以下の内容を法的に解釈しないで下さい === //

export default async function PostPage({ params }: PageProps<'/[locale]/license'>) {
  return (
    <div className="min-h-screen md:mx-2 rounded-t-[3rem] mt-10 flex flex-col"><div className='page_transition'>
      <div className="h-34 sm:h-45 bg-[#5CADCF] rounded-t-[2rem] sm:rounded-t-[3rem] flex flex-col justify-center" style={{
        backgroundImage: "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: "870px",
      }}>
        <FaCreativeCommons className="w-16 sm:w-20 h-16 sm:h-20 mx-auto" />
      </div>
      <div className="py-9 px-[1.25rem] px--[1.5rem] sm:p-11 bg-[#FDF6EE] text-[#333333] rounded-b-[3rem] flex-1 mb-10">
        <div className="text-center">
          <h1 className="text-[1.75rem] page_transition">ライセンス</h1>
          <DashedContainerDivider className="mt-8 mx-4 sm:mx-8 page_transition" />
        </div>
    
        <article className="mt-10 articleContent page_transition">
          <MdArticle content={`
このサイト上のコンテンツは、原則として CC BY 4.0 ライセンスの下で提供されます。

https://creativecommons.org/licenses/by/4.0/deed.ja

## 詳しく

- クレジットの表示を条件として、営利目的を含む複製、改変、共有、再配布などが許可されています。
- コンテンツは現状有姿で提供されており、明示的な保証はありません。
- 詳しくは Creative Commons のサイトよりライセンス全文をご確認ください。

          `} />
        </article> 
      </div>
      </div>

      <PageTransitionRunner />
    </div>
  )
}
