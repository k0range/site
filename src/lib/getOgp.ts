import ogs from "open-graph-scraper";
import { unstable_cache } from "next/cache";

export const getOgp = unstable_cache(
  async (url: string) => {
    const { result } = await ogs({ url });
    return result;
  },
  ["ogp-cache"],
  {
    revalidate: 60 * 60 * 24 * 2, // 2日
  }
);