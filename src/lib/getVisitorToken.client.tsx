"use client"

import jwt from "jsonwebtoken";
import { Turnstile } from "nextjs-turnstile";
import { createRoot } from "react-dom/client";

interface VisitorTokenPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

export function runInvisibleTurnstile(): Promise<string> {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px"; // 不可視
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleSuccess = (token: string) => {
      cleanup();
      resolve(token);
    };

    const handleError = (err: any) => {
      cleanup();
      reject(err);
    };

    const cleanup = () => {
      root.unmount();
      document.body.removeChild(container);
    };

    root.render(
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    );
  });
}

export async function getVisitorId({ getOnly }: { getOnly?: boolean }): Promise<{ visitorId: string, visitorToken: string, skipCaptchaToken?: string }> {
  let visitorId: string | null = localStorage.getItem("visitorId");

  if (visitorId) {
    const decoded: VisitorTokenPayload | null = jwt.decode(visitorId) as VisitorTokenPayload;
    if (decoded && decoded.iss === "https://korange.work" && decoded.sub && decoded.iat && decoded.exp) {
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("visitorId");
      } else {
        visitorId = decoded.sub;
        return { visitorId, visitorToken: localStorage.getItem("visitorToken")! };
      }
    }
  }

  if (getOnly) {
    return null;
  }

  const turnstileToken = await runInvisibleTurnstile()
    .catch((e) => {
      console.error("Turnstile error", e)
      throw new Error("あなたがロボットではないことを確認できませんでした")
    });

  if (!turnstileToken) {
    return null;
  }

  const response = await fetch("/api/visitor-id/create", {
    method: "POST",
    body: JSON.stringify({ turnstileToken }),
  })
    .catch((e) => {
      console.error("ビジターIDの取得に失敗しました", e)
      throw new Error("ビジターIDの取得に失敗しました")
    })
  
  const data = await response.json();
  
  if (data.visitorId && data.visitorToken) {
    return {
      visitorId: data.visitorId,
      visitorToken: data.visitorToken,
      skipCaptchaToken: data.skipCaptchaToken
    }
  } else {
    throw new Error("ビジターIDの取得に失敗しました")
  }
}