"use client"

import Image from "next/image";

import korangeIconSvg from "@/assets/icon.svg"
import { Link } from "@/i18n/navigation";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import PageTransitionRunner from "./PageTransitionRunner";

export interface SidebarItem {
  title: string
  icon: IconType
  href: string
  external?: boolean
}

export interface SidebarConfig {
  title: React.ReactNode
  items: SidebarItem[]
  footer?: React.ReactNode
}

export default function Sidebar({
  config,
  className,
  closeSidebar,
  withAnimation
}: {
  config: SidebarConfig;
  className?: string;
  closeSidebar?: () => void;
  withAnimation?: boolean;
}) {
  const pageTransition = withAnimation ? "page_transition" : ""

  return ( <>
    {withAnimation && <PageTransitionRunner elementId="sidebar-nav" scale={0.85} animDelay={50} />}
    <nav id="sidebar-nav" className={`py-10 flex flex-col justify-between ${className}`}>
      <div className="flex flex-col">
        <div className={`flex ${pageTransition}`}>
          <Image src={korangeIconSvg} alt="Logo" className="w-9" />
          <div className="text-[#FDF6EE] text-[1rem] leading-[108%] mt-auto pl-4 font-poppins">{config.title}</div>
        </div>

        <div className="mt-7.75 flex flex-col ml-1.25 font-poppins font-noto-sans-jp">
          { config.items.map((item, idx) => (
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
        {config.footer}
      </div>
    </nav>
  </> )
}
