import ArticleCard from "@/components/cards/PostCard";
import DashedContainerDivider from "@/components/article_components/dashedContainerDivider";
import PageTransitionRunner from "@/components/PageTransitionRunner";
import MainContentPx from "@/components/MainContentPx"
import { getExtracted, getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { FaKey, FaLink, FaMusic, FaPiggyBank, FaTag } from "react-icons/fa6";
import { Metadata } from "next";
import MusicPlay from "@/components/MusicPlay";
import { Link } from "@/i18n/navigation";
import PageCard from "./PageCard";
import { SiTorbrowser, SiTorproject } from "@icons-pack/react-simple-icons";

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getExtracted()

  return {
    title: locale === "ja" ? "その他 | Korange" : "Miscellaneous | Korange",
    description: t('サイドバーに載せきれないような様々なページの一覧です。'),
  };
}

export default async function Page({ params }: PageProps<'/[locale]/misc'>) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getExtracted()

  return (
    <>
      <PageTransitionRunner />
      <MainContentPx className="mt-12">
        <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">{t('その他')}</h2>
        <p className="page_transition mb-6">{t('サイドバーに載せきれないような様々なページの一覧です。')}</p>

        <div className="flex flex-col gap-4">
          {/*<PageCard
            href="/banners"
            title="相互リンクなど"
            description="リンクバナーやウェブリングなどを置いてみています。"
            icon={FaLink}
            externalLink
            className="page_transition"
          />
          <PageCard
            href="/listening"
            title="聴いてる曲"
            description="Last.fm でのトップ曲や今聴いてる曲などです。"
            icon={FaMusic}
            externalLink
            className="page_transition"
          /> */}
          <PageCard
            href="/pgp"
            title={t('PGP公開鍵')}
            description={t('僕のPGP公開鍵です。暗号化して何かを送りつけたかったり、僕が本当に僕なのかを検証したいときなどに使ってください。')}
            icon={FaKey}
            externalLink
            className="page_transition"
          />
          {/*<PageCard
            href="/onion"
            title="Onion Mirror"
            description="Torネットワーク上の僕のサイトです。このサイトのミラー(JS必須)と、JSが不要な簡易版ページなどがあります。"
            icon={SiTorbrowser}
            externalLink
            className="page_transition"
          />
          <PageCard
            href="/donate"
            title="寄付する"
            description="公開しているツールや記事が役に立っていたり、活動を応援していただける方はこちらからご支援いただけると嬉しいです。"
            icon={FaPiggyBank}
            externalLink
            className="page_transition"
          />*/}
        </div>
      </MainContentPx>
    </>
  );
}
