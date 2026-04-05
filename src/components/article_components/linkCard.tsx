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
  const ogp = await getOgp(url);

  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

  const imageUrl = resolveUrl(
    ogp?.twitterImage?.[0]?.url ?? ogp?.ogImage?.[0]?.url,
    url
  );

  const faviconUrl = resolveUrl(ogp?.favicon, url);

  console.log(ogp);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="grid grid-cols-[auto_8fr] text-[#1388b9] border-3 border-[#1388b9] rounded-2xl overflow-hidden max-ha-36 duration-200 group -mmx-[10px]"
    >
      <div className="px-5 py-4 flex flex-col justify-between flex-1">
        <div>
          <div className="text-sm font-semibold group-hover:underline underline-offset-2">
            {ogp?.ogTitle ?? ogp?.dcTitle}
          </div>
          <div className="text-xs mt-2 text-ellipsis overflow-hidden max-w-full line-clamp-1">
            {ogp?.ogDescription ?? ogp?.twitterDescription ?? ogp?.dcDescription}
          </div>
        </div>
        <div className="flex justify-start items-center mt-3">
          {faviconUrl ? (
            <img src={faviconUrl} className="w-3 h-3 mr-1.5" />
          ) : (
            <div className="bg-[#1388b9] rounded-full w-3 h-3 mr-1.5" />
          )}
          <div className="text-[0.65rem] leading-0">{ogp?.ogSiteName ?? hostname}</div>
        </div>
      </div>
      {imageUrl && (
        <div className="h-full max-h-36 min-w-42 w-full flex justify-end">
          <img src={imageUrl} className="w-full max-w-42 h-auto max-h-42 object-cover" />
        </div>
      )}
    </a>
  );
}