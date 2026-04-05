import PageTransitionRunner from "@/components/PageTransitionRunner";
import { getExtracted, getLocale, setRequestLocale } from "next-intl/server";;
import { SiNote, SiDiscord, SiMisskey, SiZenn, SiSignal } from "@icons-pack/react-simple-icons"
import { FaAddressCard, FaArrowRight, FaCakeCandles, FaCalendarDay, FaCaretRight, FaChevronRight, FaClock, FaCode, FaEllipsis, FaFire, FaGithub, FaHeart, FaLocationDot, FaN, FaPen, FaPiggyBank, FaXTwitter } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import avatarImg from "@/assets/avatar.png"
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ArticleCard from "@/components/cards/PostCard";
import MainContentPx from "@/components/MainContentPx"
import { allWorks } from "content-collections";

import NostrIcon from "@/components/icons/NostrIcon";
import KeyoxideIcon from "@/components/icons/KeyoxideIcon";
import WorkCard from "@/components/cards/WorkCard";
import { useExtracted } from "next-intl";
import { CopyableText } from "./_wip/donate/CopyableText.client";
import Timeline from "@/components/Timeline";

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getExtracted({locale});
 
  return {
    title: t('Korange / これんじ'),
    description: t('これんじの個人サイトです。')
  };
}

export default async function Home({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getExtracted();

  return (
    <div className="mt-13">
      <PageTransitionRunner scale={0.9} />

      <MainContentPx>
      <div className="flex text-[#FDF6EE]">
        <div className="flex-1">
          <Image
            priority
            src={avatarImg}
            alt="Korange's Avatar"
            width={72}
            height={72}
            sizes="4.5rem"
            className="block sm:hidden w-18 h-18 mb-6 rounded-[1.75rem] page_transition"
          />

          <h1 className="flex items-center text-3xl mb-6 mab-4 font-[600]">
            <span className="font-poppins page_transition">Korange</span>
            { locale === "ja" && <span className="block -mt-1.25 page_transition"><span className="text-xl ml-3 opacity-50">これんじ</span></span> }
          </h1>

          <p className="page_transition mb-6">
            {t('Web開発を中心にいろいろやってる中学生です。')}
          </p>

          <div className="flex flex-col gap-3 text-[16px] mb-8">
            <div className="flex gap-3 items-center page_transition">
              <FaCakeCandles className="w-5 h-5" />
              <div>2011/8/18 (14 y/o)</div>
            </div>
            <div className="flex gap-3 items-center page_transition">
              <FaLocationDot className="w-5 h-5" />
              <div>Japan (GMT+9)</div>
            </div>
            <div className="flex gap-3 items-center page_transition">
              <FaPiggyBank className="w-5 h-5" />
              <Link href="/donate" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">Support my work</Link>
            </div>
          </div>
        </div>
        <Image
          src={avatarImg}
          width={144}
          height={144}
          sizes="11rem"
          alt="Korange's Avatar"
          className="hidden sm:block w-32 h-32 rounded-[3rem] page_transition"
        />
      </div>

      <div className="mb-14">
        <div className="text-lg font-semibold mb-3 page_transition">Socials</div>
        <div className="grid gap-3 sm:gap-0 sm:grid-cols-2 w-full">
          <div className="flex flex-col gap-3 text-[16px]">
            <div className="flex gap-3 items-center page_transition">
              <FaXTwitter className="w-5 min-w-5 h-5" />
              <a href="https://x.com/korange753" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">@korange753</a>
            </div>
            <div className="flex gap-3 items-center page_transition">
              <SiMisskey className="w-5 min-w-5 h-5" />
              <a href="https://misskey.systems/@korange" target="_blank" rel="me noreferrer noopener" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">@korange@misskey.systems</a>
            </div>
            <div className="flex gap-3 items-center page_transition">
              <FaGithub className="w-5 h-5" />
              <a href="https://github.com/k0range" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">@k0range</a>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[16px]">
            <div className="flex gap-3 items-center page_transition">
              <SiZenn className="w-5 h-5" />
              <a href="https://zenn.dev/korange" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">@korange</a>
            </div>
            <div className="flex gap-3 items-center page_transition">
              <SiDiscord className="w-5 h-5 p--0.5" />
              <CopyableText text="k0range" />
            </div>
            <div className="flex gap-3 items-center page_transition">
              <SiSignal className="w-5 h-5" />
              <a href="https://signal.me/#eu/Adw59Z8jVdcvJClpdlB-oXFRf3wLksRpPCftqvSOVggfHiNnP-BEWpdZBhdSJGpt" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">krng.99</a>
            </div>
          </div>
        </div>

        {/* <div className="flex gap-0.5 items-center page_transition sm:mt-3 mta-3 sm:mta-4 sm:text-sm">
          <Link href="/socials" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">more...<FaChevronRight className="inline text-[0.7rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200" /></Link>
        </div> */}
      </div>

      <div className="mb-14">
        <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">{t('作ったもの')}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          { allWorks.filter((w) => w.featured).sort((a, b) => a.order - b.order).map(work => (
            <WorkCard
              key={work._meta.fileName}
              work={work}
              className="page_transition"
            />
          )) }
        </div>

        <div className="flex gap-0.5 items-center page_transition sm:mt-4 sm:text-sm">
          <Link href="/works" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">More works<FaChevronRight className="inline text-[0.7rem] ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200" /></Link>
        </div>
      </div>

      <div className="mb-14 text-[#FDF6EE]">
        <h2 className="text-2xl mb-6 font-semibold page_transition">{t('最近の活動')}</h2>

        <Timeline />
      </div>
      </MainContentPx>
    </div>
  );
}
