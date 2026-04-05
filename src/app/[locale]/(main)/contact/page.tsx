import PageTransitionRunner from "@/components/PageTransitionRunner";
import MainContentPx from "@/components/MainContentPx"
import { getExtracted, getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { FaBoltLightning, FaChevronRight, FaCircle, FaCopy, FaCross, FaEnvelope, FaEthereum, FaK, FaPaperPlane, FaPatreon, FaTag, FaUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { SiBitcoin, SiCircle, SiDiscord, SiGitHex, SiGithub, SiPatreon, SiSignal, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/dist/client/link";
import OfuseIcon from "@/components/icons/OfuseIcon";
import { Metadata } from "next";
import { QRCode } from 'react-qrcode-logo';
import { ContactCard } from "../../../../components/cards/ContactCard";

export async function generateMetadata({params}): Promise<Metadata> {
  const t = await getExtracted()

  return {
    title: `${t('連絡する')} | Korange`,
    description: t('僕に連絡する方法たちです。基本的に好きなものを使っていただいて構いませんが、主にフォーマルな連絡にはお問い合わせフォーム、カジュアルな連絡には Signal などがおすすめです。'),
  };
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getExtracted();

  return (
    <>
      <MainContentPx className="mt-12 mb-26">
        <h2 className="text-2xl mb-5 font-semibold page_transition">{t('連絡する')}</h2>
        <p className="page_transition mb-6 leading-8.5">{t('僕に連絡する方法たちです。基本的に好きなものを使っていただいて構いませんが、主にフォーマルな連絡にはお問い合わせフォーム、カジュアルな連絡には Signal などがおすすめです。')}</p>

        <div className="sm:mx-0 grid grid-cols--2 grid-cols-1 sm:grid-cols-3 gap-4">
          {/*<ContactCard
            href={"/contact/form/"}
            left
            className="sm:col-span-2"
            serviceIcon="form"
            title="お問い合わせフォーム"
            description="フォーマルな内容や長文のご連絡などはこちらからお願いします。"
          />

          <ContactCard
            href={""}
            serviceIcon="email"
            title="メールアドレス"
            description="クリックして表示"
          /> */}

          <ContactCard
            href={"https://signal.me/#eu/Adw59Z8jVdcvJClpdlB-oXFRf3wLksRpPCftqvSOVggfHiNnP-BEWpdZBhdSJGpt"}
            serviceIcon="signal"
            title="Signal"
            description="たぶん一番早いです。気軽に送っていただいてOKです。"
            id="krng.99"
            bgColor="#5c66cf"
          />

          <ContactCard
            href={"https://x.com/messages/compose?recipient_id=1825017481955880960"}
            serviceIcon="x"
            title="Twitter DM"
            description="X民の方はどうぞ。内容によっては返信が遅れることがあります。"
            id="@korange753"
            bgColor="#2e2e2e"
          />

          <ContactCard
            serviceIcon="discord"
            title="Discord"
            description="スパムが多いため、知り合い以外は最初のメッセージで簡単な用件を書いていただくようお願いします。"
            id="k0range"
            bgColor="#516fd1"
            copyable
          />
        </div>
      </MainContentPx>

      <PageTransitionRunner />
    </>
  );
}
