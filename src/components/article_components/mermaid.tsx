"use client"

import mermaid from "mermaid";
import React from "react";

type Props = {
  code: string;
};

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "transparent",
    primaryBorderColor: "#1388b9",
    primaryTextColor: "#1388b9",

    lineColor: "#1388b9",

    fontSize: "16px",
    fontFamily: `var(--font-inter), var(--font-noto-sans-jp)`,
    borderRadius: "12px", // ← 一部で効く
  },
})

const Mermaid: React.FC<Props> = (props) => {
  const { code } = props;
  const outputRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  const render = React.useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;
      } catch (error) {
        console.error(error);
        outputRef.current.innerHTML = "Invalid syntax";
      }
    }
  }, [code]);

  React.useEffect(() => {
    render();
  }, [render]);

  return code ? (
    <div ref={outputRef} className="mermaid flex justify-center" />
  ) : null;
};

export default Mermaid
