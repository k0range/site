"use client"

import Link from "next/link";
import { FaCheck, FaEnvelope, FaPaperPlane } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { useState } from "react";
import { useExtracted } from "next-intl";
import { SiDiscord, SiSignal, SiX } from "@icons-pack/react-simple-icons";

const iconMap: Record<string, IconType> = {
  "form": FaPaperPlane,
  "email": FaEnvelope,
  "signal": SiSignal,
  "x": SiX,
  "discord": SiDiscord,
}

type BaseProps = {
  className?: string;
  bgColor?: string;
  left?: boolean;
  serviceIcon: keyof typeof iconMap;
  title: string;
  description: string;
  id?: string;
};

export type Props =
  | ({ href: string; onClick?: never; copyable?: never } & BaseProps)
  | ({ onClick: () => void; href?: never; copyable?: never } & BaseProps)
  | ({ copyable: true; href?: never; onClick?: never } & BaseProps);

export function ContactCard({
  href,
  onClick,
  copyable,
  className,
  bgColor,
  left,
  serviceIcon,
  title,
  description,
  id,
}: Props) {
  const t = useExtracted();

  const [isCopied, setIsCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(id ?? "").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  }

  const Icon = iconMap[serviceIcon];

  const content = (
    <div className="flex sm:flex-col grow">
      <div
        className="relative w-22 sm:w-auto sm:h-20 rounded-l-2xl sm:rounded-none sm:rounded-t-2xl flex py-6.5 sm:py-0 sm:flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("/static-assets/polka-dots.svg")',
          backgroundSize: "870px",
          backgroundColor: bgColor ?? "#5CADCF"
        }}
      >
        <Icon className={`w-9 h-9 text-[#fdf6ee] ${left ? 'mx-auto sm:mx-6' : 'mx-auto'}`} />
      </div>

      <div className="sm:grow px-5 pt-5 pb-5 bg-[#FDF6EE] rounded-r-2xl sm:rounded-none sm:rounded-b-2xl flex-1 flex flex-col justify-between">
        <div>
          <h2>
            <span className="font-semibold">{title}</span>
          </h2>
          <p className="text-xs mt-2 opacity-80">{description}</p>
        </div>

        {id && (
          <div className="flex text-xs font-semibold gap-1.5 mt-3 text-[#1388b9]">
            {isCopied ? (<>
              <FaCheck className="w-4 h-4" />
              {t('コピーしました')}
            </>) : (<>
              <Icon className="w-4 h-4" />
              {id}
            </>)}
          </div>
        )}
      </div>
    </div>
  );

  const commonClass =
    "page_transition text-[#333333] rounded-t-2xl flex flex-col group transform translate-y-0 transition-transform hover:-translate-y-[3px] duration-250 text-left cursor-pointer " +
    className;
  
  if (copyable) {
    return (
      <button onClick={copy} className={commonClass}>
        {content}
      </button>
    )
  }

  if (href) {
    return (
      <Link href={href} rel="noopener noreferrer" target={((href as string).startsWith("/") || (href as string).startsWith("mailto:")) ? undefined : "_blank"} className={commonClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={commonClass}>
      {content}
    </button>
  );
}
