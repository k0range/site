"use client";

import { useLayoutEffect } from "react"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function PageTransitionRunner({ scale, animDelay, elementRef, elementId }: {
  scale?: number,
  animDelay?: number,
  elementRef?: React.RefObject<HTMLElement>,
  elementId?: string
}) {
  let delayMs = 90

  useLayoutEffect(() => {
    const transition = async () => {
      if (animDelay) {
        await delay(animDelay);
      } else {
        await delay(0);
      }

      const elem = document.getElementById(elementId) || elementRef?.current || document.getElementsByTagName('main')[0]

      const nodes = elem.querySelectorAll<HTMLElement>(".page_transition");

      for (const n of nodes) {
        if (n.classList.contains("nojs-only")) { continue };

        n.classList.add("show");
        setTimeout(() => {
          n.classList.remove(...["page_transition", "show"])
        }, 400)
        await delay(delayMs);
        delayMs *= scale ?? 0.9
      }
    }

    transition();
  });

  return null;
}
