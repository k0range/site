import ArticleCard from "@/components/cards/PostCard";
import DashedContainerDivider from "@/components/article_components/dashedContainerDivider";
import PageTransitionRunner from "@/components/PageTransitionRunner";
import MainContentPx from "@/components/MainContentPx"
import { getExtracted, getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { FaCopy, FaDownload, FaFile, FaFingerprint, FaKey, FaLink, FaMusic, FaPiggyBank, FaTag, FaUser } from "react-icons/fa6";
import { Metadata } from "next";
import MusicPlay from "@/components/MusicPlay";
import { Link } from "@/i18n/navigation";
import korangeIconSvg from "@/assets/icon.svg"
import Image from "next/image";

import fs from "fs";
import path from "path";

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale} = await params;
  setRequestLocale(locale);
    
  const t = await getExtracted()
 
  return {
    title: locale === "ja" ? "PGP公開鍵 | Korange" : "PGP Public Key | Korange",
    description: t('僕のPGP公開鍵です。暗号化して何かを送りつけたかったり、僕が本当に僕なのかを検証したいときなどに使ってください。'),
  };
}

export default async function Page({ params }: PageProps<'/[locale]/pgp'>) {
  const {locale} = await params;
  setRequestLocale(locale);
    
  const t = await getExtracted()

  let asc = fs.readFileSync(
    path.join(process.cwd(), "public/pgp.asc"),
    "utf-8"
  );
  // Comment:から始まる行と空行を削除
  asc = asc.split('\n').filter(line => !line.startsWith('Comment:') && line.trim() !== '').join('\n');

  return (
    <>
      <PageTransitionRunner />
      <MainContentPx className="mt-12">
        <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">{t('PGP公開鍵')}</h2>
        <p className="page_transition mb-3">{t('僕のPGP公開鍵です。暗号化して何かを送りつけたかったり、僕が本当に僕なのかを検証したいときなどに使ってください。')}</p>
        <p className="page_transition mb-6">{t.rich('このページの他に、ドメインの WKD と、<a>keys.openpgp.org</a> でも取得できます。', { a: (chunks) => <Link href="https://keys.openpgp.org" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">{chunks}</Link> })}</p>

        <div className="flex justify-center mt-8 mb-16 page_transition w-full">
          <div className="flex flex-col shadow-xal rounded-2xl -mx-6 sm:mx-0 sm:w-full">
            <div className="bg-[#5CADCF] sm:h-20 py-4 rounded-t-2xl px-5 flex items-center" style={{
              backgroundImage: "url(\"/static-assets/polka-dots.svg\")",
              backgroundSize: "870px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}>
              <div className={`flex flex-col justify-center sm:flex-row grow`}>
                {/*<Image src={korangeIconSvg} alt="Logo" className="w-5.5 sm:mt-0.5" />*/}
                <FaKey className="w-8 h-8 mt-2.25" />
                <div className="flex grow justify-between gap-5 mt-3 sm:mt-0 sm:px-5">
                  <div className="flex flex-col justify-center gap-1">
                    <div>
                      <div className="text-xs font-semibolad font-mono">Fingerprint</div>
                      <div className="text-[#FDF6EE] wrap-anywhere leading-[110%] flex font-mono">F4109E821F0DE67C4BA1947C4BCD87A24D615230</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibolad font-mono"><FaUser className="inline mr-1 -mt-0.5" />korange@korange.work</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <div className="text-[#FDF6EE] text-xs leading-[100%] font-poppins underline"><FaCopy className="inline mr-1 -mt-0.25" />Copy</div>
                    <div className="text-[#FDF6EE] text-xs leading-[100%] font-poppins underline"><FaFile className="inline mr-1 -mt-0.25" />Raw</div>
                    <div className="text-[#FDF6EE] text-xs leading-[100%] font-poppins underline"><FaDownload className="inline a mr-1 -mt-0.25" />Download</div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="bg-[#fdf6ee] overflow-x-scroll sm:overflow-auto sm:max-h-none max-w-screen rounded-t-2xl -scale-y-100">
              <div className="px-5 py-4 -scale-y-100">
                <div className="font-mono leading-4.5 text-[#1388b9] font-semiboald w-min mx-auto whitespace-pre-wrap relative">
                  {asc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContentPx>
    </>
  );
}
