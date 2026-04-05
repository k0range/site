import { Link } from "@/i18n/navigation";
import { SiX } from "@icons-pack/react-simple-icons";
import { FaCircleCheck, FaHeart, FaPlay, FaReply, FaRetweet, FaXTwitter } from "react-icons/fa6";
import { getTweet, TweetParent, type Tweet } from "react-tweet/api";

export function renderTweetText(tweet: Tweet | TweetParent) {
  const text = tweet.text;
  const elements: React.ReactNode[] = [];

  // display_text_range がある場合は範囲を使う
  const [startRange, endRange] = tweet.display_text_range ?? [0, text.length];
  const displayText = text.slice(startRange, endRange);

  // 文字範囲内のURLだけ取り出す
  const urlsInRange = tweet.entities.urls?.filter(
    (url) => url.indices[0] >= startRange && url.indices[1] <= endRange
  ) ?? [];

  let lastIndex = 0;

  urlsInRange.forEach((url) => {
    const [start, end] = url.indices;

    // t.co以前のテキスト
    if (start > lastIndex) {
      elements.push(displayText.slice(lastIndex, start - startRange));
    }

    // 置換リンク
    elements.push(
      <a
        key={url.url}
        href={url.expanded_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline break-all"
      >
        {url.display_url}
      </a>
    );

    lastIndex = end - startRange;
  });

  // 残りのテキスト
  if (lastIndex < displayText.length) {
    elements.push(displayText.slice(lastIndex));
  }

  // URLがなければそのまま表示
  if (elements.length === 0) return <>{displayText}</>;

  return <>{elements}</>;
}

export default async function Tweet(params: {
  id: string,
  border?: boolean
}) {
  let screenName: string | null = null;

  try {
    const tweet = await getTweet(params.id)

    const tweetUrl = `https://x.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    screenName = tweet.user.screen_name;

    return (
      <div className={`bg-[#fdf6ee] px-5 py-5 text-[#333333] rounded-2xl text-[0.93rem] ${params.border ? "border-3 border-[#1388b9]" : ""}`}>
        {tweet.parent && (
          <div className="flex">
            <div className="flex opacity-50 gap-2.75 mb-3 grow">
              <div className="flex flex-col gap-2">
                <img src={tweet.parent.user.profile_image_url_https} alt={`${tweet.parent.user.name}'s profile picture`} className={[
                  'h-8',
                  tweet.parent.user.profile_image_shape === 'Square' ? 'rounded-xl' : 'rounded-full',
                ].join(' ')} />
                <div className="w-0.5 mx-3.75 bg-[#1388b9] h-full grow rounded-full"></div>
              </div>
              <div className="grow mt-0.5">
                <div className="flex gap-1.5">
                  <div className="text-sm mb-px">{tweet.parent.user.name}</div>
                  <div className="opacity-50 text-[0.7rem] self-center">@{tweet.parent.user.screen_name}</div>
                </div>
                <p className="mb-4 text-sm mt-0.5 wrap-break-word whitespace-pre-wrap">
                  {renderTweetText(tweet.parent)}
                </p>
              </div>
            </div>
            <div>
              <a href={tweetUrl}>
                <FaXTwitter className="w-5 min-w-5 h-5 text-[#1388b9]" />
              </a>
            </div>
          </div>
        )}

        <div className="flex gap-2.75 mb-3">
          <a href={`https://x.com/${tweet.user.screen_name}`} aria-label={`${tweet.user.name}'s profile`}>
            <img src={tweet.user.profile_image_url_https} alt={`${tweet.user.name}'s profile picture`} className={[
              'h-8',
              tweet.user.profile_image_shape === 'Square' ? 'rounded-xl' : 'rounded-full',
            ].join(' ')} />
          </a>
          <div className="grow">
            <div className="flex">
              <div className="text-sm mb-px">{tweet.user.name}{tweet.user.verified_type && <FaCircleCheck className="inline ml-1.5 align-middle mt-[-2px]" />}</div>
            </div>
            <div className="opacity-50 text-[0.7rem]">@{tweet.user.screen_name}</div>
          </div>
          { !tweet.parent && (
            <div>
              <a href={tweetUrl}>
                <FaXTwitter className="w-5 min-w-5 h-5 text-[#1388b9]" />
              </a>
            </div>
          ) }
        </div>
        <p className="mb-4 wrap-break-word whitespace-pre-wrap">
          {renderTweetText(tweet)}
        </p>
        { tweet.mediaDetails && (
          <div className={`mb-4 w-full rounded-xl overflow-hidden grid ${tweet.mediaDetails.length > 1 && "grid-cols-2"} h-68 gap-1`}>
            { tweet.mediaDetails.map((media, index) => (
              <div key={index} className={[
                (tweet.mediaDetails.length === 3 && index === 0 ) && "row-[span_2]"
              ].join(' ')}>
                { ( media.type === "photo" || media.type === "animated_gif" ) && (
                  <div className={`h-full`} style={{
                    backgroundImage: `url(${media.media_url_https})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }} ></div>
                ) }
                { media.type === "video" && (
                  <a href={media.expanded_url} className="flex justify-center items-center h-full" style={{
                    backgroundImage: `url(${media.media_url_https})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}>
                    <div className="w-11 h-11 rounded-full bg-[#1388b9] flex justify-center items-center">
                      <FaPlay className="text-[#fdf6ee] text-xl ml-0.75" />
                    </div>
                  </a>
                ) }
              </div>
            )) }
          </div>
        ) }
        {tweet.quoted_tweet && (
          <div className="flex">
            <div className="flex opacitya-50 rounded-xl border-[#1388b9] border-2 border-dashed mb-5 grow">
              <div className="px-3.5 py-3 flex gap-2.75">
                <div className="flex flex-col gap-2">
                  <img src={tweet.quoted_tweet.user.profile_image_url_https} alt={`${tweet.quoted_tweet.user.name}'s profile picture`} className={[
                    'h-8 w-8 min-w-8',
                    tweet.quoted_tweet.user.profile_image_shape === 'Square' ? 'rounded-xl' : 'rounded-full',
                  ].join(' ')} />
                </div>
                <div className="grow mt-0.5">
                  <div className="flex gap-1.5 mt-0.25">
                    <div className="text-sm mb-px">{tweet.quoted_tweet.user.name}</div>
                    <div className="opacity-50 text-[0.7rem] self-center">@{tweet.quoted_tweet.user.screen_name}</div>
                  </div>
                  <p className="text-sm mt-1">
                    {renderTweetText(tweet.quoted_tweet)}
                  </p>
                  { tweet.quoted_tweet.mediaDetails && (
          <div className={`mt-3 mb-4 w-full rounded-xl overflow-hidden grid ${tweet.quoted_tweet.mediaDetails.length > 1 && "grid-cols-2"} h-68 gap-1`}>
            { tweet.quoted_tweet.mediaDetails.map((media, index) => (
              <div key={index} className={[
                (tweet.quoted_tweet.mediaDetails.length === 3 && index === 0 ) && "row-[span_2]"
              ].join(' ')}>
                { ( media.type === "photo" || media.type === "animated_gif" ) && (
                  <div className={`h-full`} style={{
                    backgroundImage: `url(${media.media_url_https})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }} ></div>
                ) }
                { media.type === "video" && (
                  <a href={media.expanded_url} className="flex justify-center items-center h-full" style={{
                    backgroundImage: `url(${media.media_url_https})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}>
                    <div className="w-11 h-11 rounded-full bg-[#1388b9] flex justify-center items-center">
                      <FaPlay className="text-[#fdf6ee] text-xl ml-0.75" />
                    </div>
                  </a>
                ) }
              </div>
            )) }
          </div>
        ) }
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex text-[#1388b9] gap-5 justify-between">
          <div className="flex items-center gap-1.5">
            <FaHeart className="\" />
            <div className="text-[0.8rem] leading-1.5">{tweet.favorite_count}</div>
          </div>

          <div className="flex items-center gap-1.5">
            <a href={tweetUrl} className="text-[0.8rem] leading-1.5">{(new Date(tweet.created_at)).toLocaleDateString()}</a>
          </div>
        </div>
      </div>
    )
  } catch (e) {
    return (
      <div className={`flex bg-[#fdf6ee] px-5 py-4 rounded-2xl text-[#1388b9] underline underline-offset-2 text-sm ${params.border ? 'decoration-[#33333360]' : 'decoration-[#1388b960]'} `}>
        <SiX className="w-5 h-5 mr-3" />
        <Link href={`https://x.com/i/status/${params.id}`}>{`https://x.com/${screenName ?? 'i'}/status/${params.id}`}</Link>
      </div>
    )
  }
}