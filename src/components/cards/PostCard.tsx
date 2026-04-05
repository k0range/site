import { emojiToTwemojiUrl } from "@/utils/emojiToTwemojiUrl";
import Image from "next/image";
import { FaArrowUpRightFromSquare, FaCalendarDay, FaLanguage, FaTag } from "react-icons/fa6";

import noteLogo from "@/assets/note-logo.png"
import zennLogo from "@/assets/zenn-logo.png"
import { Link } from "@/i18n/navigation";
import { Post } from "content-collections";
import { getExtracted, getLocale } from "next-intl/server";

export default async function PostCard({ post, leftAligned, className, style }: {
  post: Post;
  leftAligned?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const locale = await getLocale()
  const t = await getExtracted();

  const tagNames = post.tags?.map(tag => {
    if (!tag) return undefined;
    if (locale === "ja") {
      return tag.nameJa ?? tag.nameEn;
    } else {
      return tag.nameEn;
    }
  }).filter((t): t is string => Boolean(t))
  
  return (
    <Link href={"/posts/" + post.slug} className={"rounded-t-2xl flex flex-col group hover:-translate-y-[3px] transition-transform duration-250 " + className} style={style}>
      <div className={"relative h-20 bg-[#5CADCF] rounded-t-2xl flex flex-col justify-center " + (leftAligned ? "px-5" : "")} style={{
        backgroundImage: "url(\"/static-assets/polka-dots.svg\")",
        backgroundSize: "870px",
      }}>
        { post.emoji && <img src={emojiToTwemojiUrl(post.emoji)} alt={post.emoji} className={`w-10 h-10 text-[2.5rem] inline-flex justify-center items-center leading-0 ${leftAligned ? "" : "mx-auto w-full"}` + (leftAligned ? "" : "mx-auto")} style={{
          filter: [
            "drop-shadow(1px 0px 0px #FDF6EE)",
            "drop-shadow(-1px 0px 0px #FDF6EE)",
            "drop-shadow(0px 1px 0px #FDF6EE)",
            "drop-shadow(0px -1px 0px #FDF6EE)",
          ].join(' '),
        }} /> }
        { post.type === "external" && post.platform && <FaArrowUpRightFromSquare className="absolute right-4 top-4 text-[#FDF6EE] w-3.75 h-3.75" /> }
      </div>
      <div className="px-5 py-5 bg-[#FDF6EE] text-[#333333] rounded-b-2xl flex-1 flex flex-col justify-between">
        <h2 className="">{ post.title }</h2>
        <div className="flaex justify-between items-end mt-3 relative">
          <div className="flex justify-start gap-2 flex-wrap">
            { post.createdAt && <div className=" text-[#1388B9] text-xs rounded-md mr-1.25 flex items-center gap-0.75 font-semibold leading-0">
              <FaCalendarDay className="w-3.5 h-3.5 text-[#1388B9]" />{new Date(post.createdAt).toLocaleDateString()}
            </div> }
            { (post.type === "translated") && <div className=" text-[#1388B9] text-xs rounded-md mr-1.25 flex items-center gap-0.75 font-semibold leading-0">
              <FaLanguage className="w-3.5 h-3.5 text-[#1388B9]" />{t('翻訳版')}
            </div> }
            { tagNames?.map((tag, idx) => 
              <div key={idx} className=" text-[#1388B9] text-xs rounded-md mr-1.25 flex items-center gap-0.75 font-semibold leading-0">
                <FaTag className="w-3.5 h-3.5 text-[#1388B9]" />{tag}
              </div>
            ) }

            { post.platform && <div className={"text-[#1388B9] h-[0.88rem] flex flex-col-reverse ml-auto"}>
              { post.platform === "note" &&
                <Image
                  src={noteLogo}
                  alt="note"
                  className="inline h-5.5 translate-x-1 translate-y-0.75 rounded-sm w-auto min-ww-[24px]"
                />
              }
              { post.platform === "zenn" &&
                <Image
                  src={zennLogo}
                  alt="Zenn"
                  className="inline h-3.75 min-h-3.75 rounded-sm w-auto min-ww-[24px]"
                />
              }
            </div> }
          </div>
        </div>
      </div>
    </Link>
  )
}