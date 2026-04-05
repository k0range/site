import { emojiToTwemojiUrl } from "@/utils/emojiToTwemojiUrl";
import { getExtracted } from "next-intl/server";
import Link from "next/link";
import React, { FC } from "react";
import { FaArrowUpRightFromSquare, FaLink } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

export default async function PageCard(params: {
  title: string;
  description: string;
  href: string;
  emoji?: string;
  icon?: IconType;
  bgImagePath?: string;
  leftAligned?: boolean;
  className?: string;
  style?: React.CSSProperties;
  externalLink?: boolean;
}) {
  const t = await getExtracted()

  return (
    <Link href={params.href} className={"text-[#333333] rounded-t-2xl flex group transform translate-y-0 items-stretch transition-transform hover:-translate-y-[3px] duration-250 " + params.className} style={params.style}>
      <div className="relative min-h-24 w-24 bg-[#5CADCF] rounded-l-2xl flex flex-col justify-center" style={{
        backgroundImage: ( params.bgImagePath && `url("${params.bgImagePath}")` ) ?? "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: params.bgImagePath ? "cover" : "870px",
        backgroundRepeat: params.bgImagePath && "no-repeat",
        backgroundPosition: params.bgImagePath && "center"
      }}>
        <div>
          { params.emoji && <img src={emojiToTwemojiUrl(params.emoji)} alt={params.emoji} className={"w-13 h-13 " + (params.leftAligned ? "" : "mx-auto")} style={{
            filter: [
              "drop-shadow(1px 0px 0px #FDF6EE)",
              "drop-shadow(-1px 0px 0px #FDF6EE)",
              "drop-shadow(0px 1px 0px #FDF6EE)",
              "drop-shadow(0px -1px 0px #FDF6EE)",
            ].join(' '),
          }} /> }
          {params.icon && <params.icon className="w-12 h-12 mx-auto text-[#fdf6ee]" />}
        </div>
      </div>
      <div className="px-5 pt-5 flex flex-col justify-center pb-6.5 bg-[#FDF6EE] rounded-r-2xl flex-1 relative">
        <h2 className="">
          <span className="font-semibold">{ params.title }</span>
        </h2>
        <p className="text-xs mt-2 opacity-80">{ params.description }</p>
        { params.externalLink && <FaArrowUpRightFromSquare className="absolute right-5 top-5 text-[#1388b9] w-3.5 h-3.5 overflow-visible" /> }
      </div>
    </Link>
  )
}