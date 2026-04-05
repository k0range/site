"use client"

import { Link, usePathname } from "@/i18n/navigation";

export default function SidebarLocaleSwitcher({ locale, className }: { className?: string, locale: string }) {
  const pathname = usePathname()
  
  return (
    <div className={`flex text-sm leading-6 ${className}`}>
      { locale === "ja" ? (
        <div className="bg-[#FDF6EE] text-[#1388B9] font-semibold px-2.5 rounded-md">JA</div>
      ) : (
        <div className="bg-[#FDF6EE] text-[#1388B9] font-semibold px-2.5 rounded-md">EN</div>
      ) }
      <div className="text-[#fdf6ee] pl-2.5">/</div>
      { locale === "ja" ? (
        <Link href={pathname} locale="en" className="text-[#FDF6EE] px-2.5 rounded-md hover:font-semibold cursor-pointer">EN</Link>
      ) : (
        <Link href={pathname} locale="ja" className="text-[#FDF6EE] px-2.5 rounded-md hover:font-semibold cursor-pointer">JA</Link>
      ) }
    </div>
  )
}
