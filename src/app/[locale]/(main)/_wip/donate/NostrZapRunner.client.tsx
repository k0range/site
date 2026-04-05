"use client"

import { useEffect } from "react";

export default function NostrZapRunner() {
  useEffect(() => {
    (async () => {
      import("nostr-zap")
      const { nostrZapView } = await import("nostr-zap-view")

      nostrZapView();
    })()
  })

  return null
}
