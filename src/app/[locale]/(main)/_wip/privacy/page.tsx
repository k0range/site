import DashedContainerDivider from '@/components/article_components/dashedContainerDivider'

import { FaFileShield } from 'react-icons/fa6'
import PageTransitionRunner from '@/components/PageTransitionRunner'
import { getExtracted } from 'next-intl/server'
import MdArticle from '@/components/MdArticle'

// プライバシーポリシーは作成中！！！現在の内容はサンプルみたいなもので効力を持ちません！
// 近日中にちゃんと決めます！！！！！

// === 以下の内容を法的に解釈しないで下さい === //

export default async function PostPage({ params }: PageProps<'/[locale]/privacy'>) {
  const t = await getExtracted()

  return (
    <div className="min-h-screen md:mxx-2 rounded-t-[3rem] mt-10 flex flex-col"><div className='page_transition'>
      <div className="h-34 sm:h-45 bg-[#5CADCF] rounded-t-[2rem] sm:rounded-t-[3rem] flex flex-col justify-center" style={{
        backgroundImage: "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: "870px",
        backgroundPosition: "center top"
      }}>
        <FaFileShield className="w-16 sm:w-20 h-16 sm:h-20 mx-auto" />
      </div>
      <div className="py-9 px-[1.25rem] px--[1.5rem] sm:p-11 bg-[#FDF6EE] text-[#333333] rounded-b-[3rem] flex-1 mb-10">
        <div className="text-center">
          <h1 className="text-[1.75rem] page_transition">プライバシーポリシー</h1>
          <DashedContainerDivider className="mt-8 mx-4 sm:mx-8 page_transition" />
        </div>
    
        <article className="mt-10 articleContent page_transition">
          <MdArticle content={`
当サイトは、個人のウェブサイトであり、訪問者の個人情報を収集することはありません。ただし、当サイトを訪問することで収集される情報がありますので、以下に記載します。

## IPアドレス、Cookie、その他の情報の収集

当サイトは、訪問者のIPアドレス、Cookie、ウェブブラウザの種類などの情報を収集する場合があります。これらの情報は、訪問者の利用状況を分析するために使用されますが、個人を特定するものではありません。

## 広告配信について

当サイトは、第三者配信の広告サービスを利用することがあります。広告配信事業者は、Cookieやウェブビーコンなどを使用し、訪問者の興味に応じた広告を表示します。広告配信事業者によるCookieの使用を無効にすることができますので、ブラウザの設定をご確認ください。

## 外部リンクについて

当サイトは、外部のリンクを含む場合がありますが、外部サイトにおける個人情報の保護については、当サイトは責任を負いかねます。外部サイトへのリンクをクリックされた場合は、リンク先サイトのプライバシーポリシーを確認してください。


          `} />
        </article> 
      </div>
      </div>

      <PageTransitionRunner />
    </div>
  )
}
