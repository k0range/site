import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { getExtracted, getLocale, getTranslations } from "next-intl/server";
import { Work } from "content-collections";

export default async function WorkCard({ work, className, style }: {
  work: Work;
  className?: string;
  style?: React.CSSProperties;
}) {
  const locale = await getLocale();
  const t = await getExtracted();

  return (
    <Link href={"/works/" + work.slug} className={"text-[#333333] rounded-t-2xl flex flex-col group transform translate-y-0 transition-transform hover:-translate-y-[3px] duration-250 " + className} style={style}>
      <div className="relative h-20 bg-[#5CADCF] rounded-t-2xl flex flex-col justify-center overflow-hidden" style={{
        backgroundImage: work.coverBgCss ?? "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: work.coverBgCss ? "cover" : "870px",
        backgroundRepeat: work.coverBgCss && "no-repeat",
        backgroundPosition: work.coverBgCss && "center"
      }}>
        { work.coverBgImage &&
          <Image
            fill
            src={work.coverBgImage}
            alt=""
            sizes="370px"
          /> 
        }
        { work.coverIcon && <div className="absolute inset-0" style={{
          top: work.coverPyPercent && work.coverPyPercent + "%",
          bottom: work.coverPyPercent && work.coverPyPercent + "%",
        }}>
          <div className="h-full relative">
            <Image fill src={work.coverIcon} alt={`${ locale === "ja" ? work.name.ja ?? work.name.en : work.name.en ?? work.name.ja } Icon`} className="absolute inset-0 w-auto object-contain" />
          </div>
        </div> }
        {/* work.directLink && <FaArrowUpRightFromSquare className="absolute right-4 top-4 text-[#FDF6EE] w-3.75 h-3.75" /> */}
      </div>
      <div className="px-5 pt-5 pb-6 bg-[#FDF6EE] rounded-b-2xl flex-1">
        <h2 className="">
          <span className="font-semibold">{ locale === "ja" ? work.name.ja ?? work.name.en : work.name.en ?? work.name.ja }</span>
          { work.label && <span className="align-middle ml-2 bg-[#539dbd] rounded-full text-white px-1.5 py-0.5 text-[0.7rem] whitespace-nowrap mb-2">
            { work.label === "inDev" && t("開発中") }
            { work.label === "ideaStage" && t("アイデア段階") }
          </span> }
        </h2>
        <p className="text-xs mt-2 opacity-80">{ locale === "ja" ? work.description.ja ?? work.description.en : work.description.en ?? work.description.ja }</p>
      </div>
    </Link>
  )
}