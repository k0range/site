import { allPosts, allTimelines, allWorks, Post } from "content-collections"
import { useExtracted } from "next-intl";
import { getExtracted, getLocale } from "next-intl/server";
import { FaCalendar, FaFire, FaPen } from "react-icons/fa6";
import Tweet from '@/components/Tweet'
import PostCard from "./cards/PostCard";
import WorkCard from "./cards/WorkCard";
import LinkCard from "./cards/LinkCard";
import { Link } from "@/i18n/navigation";

interface TimelineContent {
  icon: "fire" | "calendar" | "pen"
  content: string;
  linkCard?: string;
  postSlug?: string;
  workSlug?: string;
  xPostId?: string;
  date: Date;
}

type PostWithPlatform = Extract<Post, { platform: string }>
const platforms: Partial<Record<PostWithPlatform["platform"], { name: string; url: string; }>> = {
  note: {
    name: "note",
    url: "https://note.com/"
  },
  zenn: {
    name: "Zenn",
    url: "https://zenn.dev/"
  }
}

function formatDate({ date, locale }: { date: Date, locale: string }): string {
  const englishMonths = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  }

  if (locale === "ja") {
    return `${date.getMonth() + 1}/${date.getDate()}`
  } else {
    return `${englishMonths[date.getMonth() + 1]} ${date.getDate()}`
  }
}

export function TimelineText({ text }) {
  // []() のパターン
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [full, label, url] = match;
    const index = match.index;

    // リンク前のテキスト
    if (index > lastIndex) {
      elements.push(
        <span key={lastIndex} className="opacity-90">
          {text.slice(lastIndex, index)}
        </span>
      );
    }

    // リンク
    elements.push(
      <a key={index} href={url}>
        {label}
      </a>
    );

    lastIndex = index + full.length;
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    elements.push(
      <span key={lastIndex} className="opacity-80">
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <>{elements}</>;
}

export default async function Timeline() {
  const locale = await getLocale()
  const t = await getExtracted()

  const allContent: TimelineContent[] = [
    ...allWorks.map(work => ({
      icon: "fire" as const,
      content: t("{work} をリリースしました", { work: `[${locale === "ja" ? work.name.ja || work.name.en : work.name.en || work.name.ja}](/${work.slug})` }),
      workSlug: work.slug,
      date: new Date(work.releasedAt)
    })),
    ...allPosts.filter(post => post.published && post.locale === locale).map(post => ({
      icon: "pen" as const,
      content: t("{platform} で記事を公開しました", { platform: post.type === "external" ? `[${platforms[post.platform].name}](${platforms[post.platform].url})` : `[Korange's Site](/)` }),
      postSlug: post.slug,
      date: new Date(post.createdAt)
    })),
    ...allTimelines.map(tl => ({
      icon: tl.icon,
      content: tl.content[locale] ?? "",
      postSlug: tl.linkCard && allPosts.find(p => p.slug === tl.linkCard)?.slug,
      workSlug: tl.linkCard && allWorks.find(w => w.slug === tl.linkCard)?.slug,
      xPostId: tl.tweetUrl ? tl.tweetUrl.split("/").slice(-1)[0] : undefined,
      linkCard: tl.linkCard,
      date: new Date(tl.date),
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  const contentByYear: Record<number, TimelineContent[]> =
  allContent.reduce((acc, item) => {
    const year = item.date.getFullYear()

    if (!acc[year]) {
      acc[year] = []
    }

    acc[year].push(item)

    return acc
  }, {} as Record<number, TimelineContent[]>)

  return (
    <div>
      { Object.keys(contentByYear).sort((a, b) => Number(b) - Number(a)).map(year => (
        <div key={year} className="not-first:mt-10">
          <h3 className="mb-2 text-xl page_transition">{year}</h3>
          <div className="relative flex page_transition flex-col gap-7 before:absolute before:top-0 before:h-full before:left-4.5 before:border-l-4 before:border-l-[#FDF6EE49] before:border-dotted -ml-2.5">
            { contentByYear[year].map(c => (
              <div className="w-full flex gap-1 page_transition">
                <div className="bg-[#1388b9] rounded-full w-10 h-10 p-2.5 z-10">
                  { c.icon === "fire" && <FaFire className="w-full h-full" /> }
                  { c.icon === "pen" && <FaPen className="w-full h-full" /> }
                  { c.icon === "calendar" && <FaCalendar className="w-full h-full" /> }
                </div>
                <div className="flex-1 mt-2">
                  <div className="aflex juastify-betweaen mb-3">
                    <div className="text-[16px] inline">
                      <TimelineText text={c.content} />
                    </div>
                    <div className="mb-3 bg-white text-[#1388b9] rounded-full text-xs align-middle ml-2.5 opacity-50 px-1.5 py-0.5 inline leading">{ formatDate({ date: c.date, locale }) }</div>
                  </div>
                  { c.postSlug && <PostCard post={allPosts.find(p => p.slug === c.postSlug)!} leftAligned     className="page_transition" /> }
                  { c.workSlug && <WorkCard work={allWorks.find(w => w.slug === c.workSlug)!}     className="page_transition sm:max-w-64" /> }
                  { c.xPostId && <Tweet id={c.xPostId} /> }
                  { c.linkCard && <LinkCard url={"https://bento.me"} /> }
                </div>
              </div>
            )) }
          </div>
        </div>
      ))}
    </div>
  )
}