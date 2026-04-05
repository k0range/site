"use client";

import { SiBitcoin } from "@icons-pack/react-simple-icons";
import { cloneElement, ComponentType, ReactNode, SVGProps, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaBitcoin, FaBoltLightning, FaCheck, FaCopy, FaEthereum, FaQrcode, FaXmark } from "react-icons/fa6";
import QRCode from "react-qrcode-logo";

export function CopyableText({ text, withQrCode, qrContent, qrIcon }: { text: string, withQrCode?: boolean, qrContent?: string, qrIcon?: ReactNode }) {
  const [isCopied, setIsCopied] = useState(false);
  
  const [qrDialogMounted, setQrDialogMounted] = useState(false); // DOMに存在するか
  const [qrDialogOpen, setQrDialogOpen] = useState(false);       // 表示アニメーション

  if (withQrCode) {
    useEffect(() => {
      if (qrDialogMounted) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [qrDialogMounted]);
  }

  const openQrDialog = () => {
    setQrDialogMounted(true);
    setTimeout(() => setQrDialogOpen(true), 0);
  };

  const closeQrDialog = () => {
    setQrDialogOpen(false);
    setTimeout(() => {
      setQrDialogMounted(false)
    }, 200); // アニメーション時間と合わせる
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <>
      <span className="inline-block break-all">
        <span className="copyable-text inline text-left group underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] cursor-pointer duration-200" onClick={copy}>
          {text}
          <button className="cursor-pointer needs-js" onClick={copy}>
            { isCopied ? (
              <FaCheck className="inline text-sm ml-1.5 mb-0.5 opacity-70 overflow-visible" />
            ) : (
              <FaCopy className="inline text-sm ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200 overflow-visible" />
            ) }
          </button>
        </span>
        <noscript>
          <style>{`
            .copyable-text {
              cursor: text;
            }
          `}</style>
        </noscript>
        { withQrCode && (
          <button className="cursor-pointer group needs-js" onClick={openQrDialog}>
            <FaQrcode className="inline text-sm ml-1.5 mb-0.5 opacity-50 group-hover:opacity-70 duration-200 overflow-visible" />
          </button>
        ) }
      </span>

      { qrDialogMounted && createPortal(
        <div onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeQrDialog();
          }
        }} className={`
          fixed inset-0 bg-black/20 backdrop-blur-xs z-50 duration-200 flex justify-center items-center
          ${qrDialogOpen ? "opacity-100" : "opacity-0"}
        `}>
          <div className={`
            p-6 bg-[#fdf6ee] rounded-2xl border-none z-50 relative duration-200
            ${qrDialogOpen ? "scale-100" : "scale-[0.98]"}
          `}>
            <div className="border-4 border-[#1388b9] rounded-2xl py-2 px-2 relative max-w-[calc(192px+1.5rem)] mx-auto">
              <QRCode
                value={qrContent ?? text}
                ecLevel="Q"
                bgColor="#fdf6ee"
                fgColor="#1388b9"
                size={192}
                quietZone={0}
                qrStyle="dots"
                eyeRadius={128}
              />
              <div className="absolute top-0 left-0 w-full flex items-center justify-center h-full">
                {qrIcon && (
                  <div
                    className="overflow-visible w-8 h-8 text-[#1988b9]"
                    style={{
                      filter: [
                        "drop-shadow(4px 0px 0px #FDF6EE)",
                        "drop-shadow(-4px 0px 0px #FDF6EE)",
                        "drop-shadow(0px 4px 0px #FDF6EE)",
                        "drop-shadow(0px -4px 0px #FDF6EE)",
                        "drop-shadow(1px 1px 0px #FDF6EE)",
                        "drop-shadow(-1px -1px 0px #FDF6EE)",
                        "drop-shadow(-1px 1px 0px #FDF6EE)",
                        "drop-shadow(1px -1px 0px #FDF6EE)",
                      ].join(" "),
                    }}
                  >
                    {qrIcon}
                  </div>
                )}
              </div>
            </div>
            <div className="text-[#1388b9] text-center font-semibold mt-4 text-[0.75rem] wrap-break-word max-w-[calc(192px+1.5rem)] mx-auto">{qrContent ?? text}</div>
          </div>
        </div>
      , document.body) }
    </>
  );
}