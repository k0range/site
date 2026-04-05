import PageTransitionRunner from "@/components/PageTransitionRunner";
import MainContentPx from "@/components/MainContentPx"
import { getExtracted, getLocale, getTranslations } from "next-intl/server";
import { FaBoltLightning, FaChevronRight, FaCircle, FaCopy, FaCross, FaEthereum, FaK, FaPatreon, FaTag, FaUpRightFromSquare } from "react-icons/fa6";
import { SiBitcoin, SiGithub, SiPatreon } from "@icons-pack/react-simple-icons";
import Link from "next/dist/client/link";
import OfuseIcon from "@/components/icons/OfuseIcon";
import { CopyableText } from "./CopyableText.client";
import { Metadata } from "next";
import NostrZapRunner from "./NostrZapRunner.client";
import NostrIcon from "@/components/icons/NostrIcon";

export async function generateMetadata({params}): Promise<Metadata> {
  const t = await getExtracted()

  return {
    title: `${t('寄付する')} | Korange`,
    description: t('公開しているツールや記事が役に立っていたり、活動を応援していただける方はこちらからご支援いただけると嬉しいです。'),
  };
}

export default async function DonatePage({ params }: PageProps<'/[locale]/donate'>) {
  const locale = await getLocale()
  const t = await getExtracted()

  return (
    <>
      <MainContentPx className="mt-12">
        <h2 className="text-2xl mb-6 font-semibold page_transition">{t('寄付する')}</h2>
        <p className="page_transition mb-6">{t('公開しているツールや記事が役に立っていたり、活動を応援していただける方はこちらからご支援いただけると嬉しいです。')}</p>
        <div className="flex flex-col gap-3 text-[16px] mb-8">
          <div className="flex gap-3 page_transition">
            <FaCircle className="w-5 min-w-5 h-5 p-1.25 mt-[0.05em]" />
            <div>
              Kyash:{' '}
              <CopyableText
                text="@aaaaa"
                withQrCode
                qrContent="kyash://qr/u/11111111111"
              />
            </div>
          </div>
          <div className="flex gap-3 page_transition">
            <SiGithub className="w-5 min-w-5 h-5 mt-[0.05em]" />
            <div><Link href="https://github.com/sponsors/k0range" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200 group">GitHub Sponsors<FaUpRightFromSquare className="inline text-[0.7rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200 overflow-visible" /></Link></div>
          </div>
          <div className="flex gap-3 page_transition">
            <SiPatreon className="w-5 min-w-5 h-5 mt-[0.05em]" />
            <div><Link href="https://www.patreon.com/aaaaaa" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200 group">Patreon<FaUpRightFromSquare className="inline text-[0.7rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200 overflow-visible" /></Link></div>
          </div>
          {/* <div className="flex gap-3 page_transition">
            <OfuseIcon className="w-5 min-w-5 h-5 mt-[0.05em]" />
            <div><Link href="/donate" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200 group">OFUSE<FaUpRightFromSquare className="inline text-[0.7rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200 overflow-visible" /></Link></div>
          </div> */}
        </div>

        <h3 className="text-lg font-semibold mb-3 page_transition">{t('仮想通貨')}</h3>

        <div className="flex flex-col gap-3 text-[16px] mb-8">
          <div className="flex gap-3 page_transition">
            <FaEthereum className="w-5 min-w-5 h-5 mt-[0.05em]" />
            <div>
              Ethereum:{' '}
              <CopyableText
                text="0xTHIS1SASAMPLEETHEREUMADDRESSa4s3a5sAca5"
                withQrCode
                qrIcon={<FaEthereum className="w-full h-full" />}
              />
            </div>
          </div>
          <div className="flex gap-3 page_transition">
            <SiBitcoin className="w-5 min-w-5 h-5 mt-[0.05em]" />
            <div>
              Bitcoin On-chain:{' '}
              <CopyableText
                text={"bc1fwe5f1we65few65fwe16few516fwe1f65ew".toLowerCase()}
                withQrCode
                qrIcon={<SiBitcoin className="w-full h-full" />}
              />
            </div>
          </div>
          <div className="flex gap-3 page_transition">
            <FaBoltLightning className="w-5 min-w-5 h-5 mt-[0.05em]" />
            <div>
              Bitcoin Lightning:{' '}
              <CopyableText
                text="aaaaaaaaaa@walletofsatoshi.com"
                withQrCode
                qrIcon={<FaBoltLightning className="w-full h-full" />}
              />
            </div>
          </div>
          <div className="page_transition nojs-only">
            <div className="flex gap-3 opacity-50">
              <NostrIcon className="w-5 min-w-5 h-5 mt-[0.05em]" />
              <div>
                Nostr で Zap を送るには JavaScript が必要です。
              </div>
            </div>
          </div>
          <div className="page_transition js-only">
            <div className="flex gap-3">
              <NostrIcon className="w-5 min-w-5 h-5 mt-[0.05em]" />
              <div>
                <button 
                  data-npub="npub1k0range389slcgv98d72x4ekzq8xa8majc8g6qd24h9gqkuqd4kslgvk4u"
                  data-relays="wss://relay.damus.io,wss://yabu.me,wss://nos.lol,wss://relay.nostr.band"
                  className="cursor-pointer underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200 group"
                >
                  Nostr で Zap を送る<FaChevronRight className="inline text-[0.7rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200" />
                </button>
                <button 
                  data-nzv-id="npub1k0range389slcgv98d72x4ekzq8xa8majc8g6qd24h9gqkuqd4kslgvk4u"
                  data-relay-urls="wss://relay.damus.io,wss://yabu.me,wss://nos.lol,wss://relay.nostr.band"
                  data-zap-color-mode="true"
                  className="cursor-pointer underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200 group opacity-70 text-xs ml-3.5"
                >
                  Zap 一覧を見る<FaChevronRight className="inline text-[0.6rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm page_transition">仮想通貨類は試験的に置いてみている感じです。技術的に興味があるので優先的に使っていただけると助かるかも...?</p>
      </MainContentPx>

      <PageTransitionRunner />

      <NostrZapRunner />
    </>
  );
}
