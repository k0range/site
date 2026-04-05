import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const ratelimit = {
  createVisitorId: new Ratelimit({
    redis,
    prefix: "ratelimit:create-visitor-id",
    limiter: Ratelimit.slidingWindow(5, "60s"),
  }),
  comments: new Ratelimit({
    redis,
    prefix: "ratelimit:comments",
    limiter: Ratelimit.slidingWindow(5, "60s"),
  }),
};
