"use client"

import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { FaHouse, FaPen, FaStar, FaEnvelope, FaEllipsis, FaSliders } from "react-icons/fa6";
import SidebarLocaleSwitcher from "./SidebarLocaleSwitcher";
import { useExtracted } from "next-intl";
import { IconType } from "react-icons/lib";
import { SiJavascript, SiTorbrowser } from "@icons-pack/react-simple-icons";
import Sidebar from "./Sidebar";

interface Item {
  title: string;
  icon: IconType;
  href: string;
}

export default function MainSidebar({
  locale,
  className,
  closeSidebar,
  withAnimation,
  showAdminLink = false
}: {
  locale: string;
  className?: string;
  closeSidebar?: () => void;
  withAnimation?: boolean;
  showAdminLink?: boolean;
}) {
  const t = useExtracted();

  const pageTransition = withAnimation ? "page_transition" : ""

  const items: Item[] = [
    {
      title: t('トップ'),
      icon: FaHouse,
      href: "/"
    },
    {
      title: t('作ったもの'),
      icon: FaStar,
      href: "/works"
    },
    {
      title: t('書いたもの'),
      icon: FaPen,
      href: "/writings"
    },
    {
      title: t('連絡する'),
      icon: FaEnvelope,
      href: "/contact"
    },
    {
      title: t('その他'),
      icon: FaEllipsis,
      href: "/misc"
    }
  ]
  
  return (
    <Sidebar
      className={className}
      closeSidebar={closeSidebar}
      withAnimation={withAnimation}
      config={{
        title: <>Korange's<br />Site</>,
        items: items,
        footer: (
          <>
            <SidebarLocaleSwitcher className={pageTransition} locale={locale} />
            <div className="opacity-60">
              <div className={`mt-4 text-[#FDF6EE] text-xs ${pageTransition}`}>© 2026 Korange</div>
              <div className={`mt-1.25 underline underline-offset-2 flex flex-wrap text-[#FDF6EE] text-xs gap-4 ${pageTransition}`}>
                {showAdminLink && <NextLink href="/admin">Admin</NextLink>}
                <Link href="/terms">Terms</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/license">License</Link>
              </div>
            </div>
            <div className={`mt-4 empty:mt-0 flex flex-col gap-2 text-[0.725em] ${pageTransition}`}>
              <div className="leading-4.5 opacity-60">
                {t('本サイトは作業中のデモ版です。未完成のページが一部あります。')}
              </div>
              {false && <div className="leading-4.5 opacity-60">
                <SiTorbrowser className="inline align-center mr-1.5 -mt-0.5 w-3.75 min-w-3.75 h-3.75" />
                {t('Onion Service としてアクセスしています。')}<Link className="underline underline-offset-2" href="/onion/">詳しく...</Link>
              </div>}
              <noscript className="block leading-4.5 opacity-60">
                <SiJavascript className="inline align-center mr-1.5 -mt-0.5 w-3.75 min-w-3.75 h-3.75 rounded-sm" />
                {t('JavaScriptが有効化されていません。本サイトの一部の機能は利用できない場合があります。')}
              </noscript>
            </div>
          </>
        )
      }}
    />
  )
}
