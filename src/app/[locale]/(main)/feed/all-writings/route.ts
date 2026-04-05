import { allPosts } from 'content-collections';
import { getExtracted } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import RSS from 'rss';

export async function GET(req: NextRequest, props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const t = await getExtracted({ locale: locale });

  const feed = new RSS({
    title: t("Korange の書いた記事"),
    description: t("Korange が書いた日本語の記事を集めたフィードです。個人サイトに投稿した記事や、Zennやnoteなど他のプラットフォームに投稿された記事も含まれます。"),
    site_url: "https://korange.work/${locale}/writings/",
    feed_url: `https://korange.work/${locale}/feed/all-writings`,
    language: locale,
  });

  const writings = [
    ...allPosts.filter(post => post.locale === locale),
  ]

  const result = writings
    .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

  result.forEach((post) => {
    let description = '';
    if ("description" in post && post.description) {
      description = post.description;
    } else if (post.excerpt) {
      description = post.excerpt;
    }
    
    feed.item({
      title: post.title,
      description: description,
      date: new Date(post.createdAt),
      url: ('url' in post) ? post.url : "https://korange.work/posts/" + post.slug,
      author: 'Korange',
      // enclosure: {
      //   type: "image/png",
      //   url: `https://korange.work/generated-ogp/posts/wide_${post.locale}_${post.slug}.png`
      // } NextのOGPがどこにあるのか分からないので一旦保留
    });
  })
  
  const xml = feed.xml();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
