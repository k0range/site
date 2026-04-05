import { ratelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "nextjs-turnstile";
import jwt from "jsonwebtoken";
import { redis } from "@/lib/redis";

const CROCKFORD_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function toBase32Crockford(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let output = "";

  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += CROCKFORD_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += CROCKFORD_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

export async function POST(request: Request) {
  const { success } = await ratelimit.createVisitorId.limit(request.headers.get("x-forwarded-for") || "unknown")
  if (!success) {
    return Response.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  const { turnstileToken } = await request.json()
  
  const isTurnstileValid = await verifyTurnstile(turnstileToken);
  
  if (!isTurnstileValid) {
    return Response.json(
      { error: "CAPTCHA verification failed" },
      { status: 400 }
    );
  }

  const visitorIdBytes = new Uint8Array(10); // 80bit
  crypto.getRandomValues(visitorIdBytes);
  const visitorId = toBase32Crockford(visitorIdBytes);

  const visitorToken = jwt.sign(
    {
      iss: "https://korange.work",
      aud: "visitor",
      sub: visitorId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 1, // １ヶ月有効
    },
    process.env.JWT_SECRET!,
  )

  const skipCaptchaTokenBytes = new Uint8Array(16); // 128bit
  crypto.getRandomValues(skipCaptchaTokenBytes);
  const skipCaptchaToken = toBase32Crockford(skipCaptchaTokenBytes);
  redis.set(`skip-captcha-token:${skipCaptchaToken}`, {
    forVisitorId: visitorId
  }, {
    ex: 60 * 2 // 2分
  })

  return Response.json({ visitorId, visitorToken, skipCaptchaToken });
}
