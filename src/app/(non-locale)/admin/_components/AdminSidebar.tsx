"use client"

import Image from "next/image";

import korangeIconSvg from "@/assets/icon.svg"
import Link from "next/link";
import { FaHouse, FaPen, FaStar, FaEnvelope, FaEllipsis, FaComment, FaLink, FaArrowUpFromBracket, FaArrowUpRightFromSquare, FaGlobe } from "react-icons/fa6";
import { useExtracted, useTranslations } from "next-intl";
import { IconType } from "react-icons/lib";
import PageTransitionRunner from "@/components/PageTransitionRunner"
import { SiGoogleanalytics, SiJavascript, SiTorbrowser } from "@icons-pack/react-simple-icons";
import { authClient } from "@/lib/auth-client";

interface Item {
  title: string;
  icon: IconType;
  href: string;
  external?: boolean;
}

export default function AdminSidebar({
  className,
  closeSidebar,
  withAnimation
}: {
  className?: string;
  closeSidebar?: () => void;
  withAnimation?: boolean;
}) {
  const session = authClient.useSession();

  const showAdmin = session?.data?.user?.github_name === "k0range"

  const pageTransition = withAnimation ? "page_transition" : ""

  const items: Item[] = [
    {
      title: 'ホーム',
      icon: FaHouse,
      href: "/admin"
    },
    {
      title: 'コメント',
      icon: FaComment,
      href: "/admin/comments"
    },
    {
      title: '短縮リンク',
      icon: FaLink,
      href: "/admin/links"
    },
    {
      title: 'アナリティクス',
      icon: SiGoogleanalytics,
      href: "/admin/analytics",
      external: true
    },
  ]
  
  return ( <>
    {withAnimation && <PageTransitionRunner elementId="sidebar-nav" scale={0.85} animDelay={50} />}
    <nav id="sidebar-nav" className={`py-10 flex flex-col justify-between ${className}`}>
      <div className="flex flex-col">
        <div className={`flex ${pageTransition}`}>
          <Image src={korangeIconSvg} alt="Logo" className="w-9" />
          <div className="text-[#FDF6EE] text-[1rem] leading-[108%] mt-auto pl-4 font-poppins">Admin<br />Dashboard</div>
        </div>

        <div className="mt-7.75 flex flex-col ml-1.25">
          { items.map((item, idx) => (
            <Link key={idx} href={item.href} onClick={closeSidebar} className={`flex group cursor-pointer py-2.25 ${pageTransition}`} target={item.external ? "_blank" : undefined}>
              <div className="flex items-center gap-4 group-hover:scale-103 transition-transform duration-200">
                <item.icon className="w-7 h-7" color="#fdf6ee"/>
                <div className="text-[#FDF6EE] text-lg">{item.title}{item.external && <FaArrowUpRightFromSquare className="ml-2 -mt-1.5 inline text-xs overflow-visible opacity-50" />}</div>
              </div>
            </Link>
          )) }
        </div>
      </div>

      <div className="flex flex-col">
        <Link href="/" className="mt-4 flex transition-transform hover:-translate-y-[3px] duration-250">
          <div className="relative w-16 min-w-16 min-h-16 bg-[#5CADCF] rounded-l-2xl flex flex-col justify-center" style={{
            backgroundImage: "url(\"/static-assets/polka-dots.svg\"",
            backgroundSize: "870px",
            backgroundPosition: "center"
          }}>
            <FaGlobe className="mx-auto w-7 h-7" />
          </div>
          <div className={`grow bg-[#fdf6ee] text-[#1388b9] px-3.5 py-3.25 rounded-r-2xl`}>
            <div className="font-semibold text-[.85em]">公開サイトに戻る</div>
            <div className="pt-0.25 text-[.7em] font-normal">Back to public site</div>
          </div>
        </Link>
        <div className="opacity-60 mt-4">
          <div className={`underline underline-offset-2 flex flex-wrap text-[#FDF6EE] text-xs gap-4 ${pageTransition}`}>
            <Link href="/terms">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  </> )
}
