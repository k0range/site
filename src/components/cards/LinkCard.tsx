import { getOgp } from "@/lib/getOgp";

type LinkCardProps = {
  url: string;
};

// 相対URLを絶対URLに解決するヘルパー
function resolveUrl(src: string | undefined, base: string): string | undefined {
  if (!src) return undefined;
  try {
    return new URL(src, base).href;
  } catch {
    return undefined;
  }
}

export default async function LinkCard({ url }: LinkCardProps) {
  try {
    const ogp = await getOgp(url);

    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    const imageUrl = resolveUrl(
      ogp?.twitterImage?.[0]?.url ?? ogp?.ogImage?.[0]?.url,
      url
    );

    const faviconUrl = resolveUrl(ogp?.favicon, url);

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-[auto_8fr] bg-[#FDF6EE] text-[#333333] rounded-2xl overflow-hidden -mmx-[10px] hover:-translate-y-[3px] transition-transform duration-250"
      >
        <div className="px-5 py-5 flex flex-col justify-between flex-1">
          <div>
            <div className="font-semibold underline-offset-2">
              {ogp?.ogTitle ?? ogp?.dcTitle ?? ogp?.twitterTitle ?? url.replace(/https?:\/\//, "").replace(/\/$/, "")}
            </div>
            <div className="text-xs mt-2 text-ellipsis overflow-hidden max-w-full line-clamp-1">
              {ogp?.ogDescription ?? ogp?.twitterDescription ?? ogp?.dcDescription}
            </div>
          </div>
          <div className="flex justify-start items-center mt-3">
            {faviconUrl ? (
              <img src={faviconUrl} className="w-3 h-3 mr-1.5" />
            ) : (
              <div className="h-3 w-0" />
            )}
            { /**/}
            <div className="text-[0.7rem] leading-0 text-[#1388b9]">{(ogp?.ogTitle ?? ogp?.dcTitle ?? ogp?.twitterTitle) ? (ogp?.ogSiteName ?? hostname) : url}</div>
          </div>
        </div>
        {imageUrl && (
          <div className="h-full max-h-36 min-w-42 w-full flex justify-end">
            <img src={imageUrl} className="w-full max-w-42 h-auto max-h-38 object-cover" />
          </div>
        )}
      </a>
    );
  } catch (error) {
    console.error("Failed to fetch OGP data for URL:", url, error);
    // OGPの取得に失敗した場合は、最低限の情報だけを表示する
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-[auto_8fr] bg-[#FDF6EE] text-[#333333] rounded-2xl overflow-hidden -mmx-[10px] hover:-translate-y-[3px] transition-transform duration-250"
      >
        <div className="px-5 py-5 flex flex-col justify-between flex-1">
          <div>
            <div className="font-semibold underline-offset-2">
              {url.replace(/https?:\/\//, "").replace(/\/$/, "")}
            </div>
          </div>
          <div className="flex justify-start items-center mt-3">
            <div className="h-3 w-3 bg-[#1388b9] aspect-square mr-1.5 rounded-full" />
            <div className="text-[0.7rem] leading-0 text-[#1388b9]">{url}</div>
          </div>
        </div>
      </a>
    )
  }
}