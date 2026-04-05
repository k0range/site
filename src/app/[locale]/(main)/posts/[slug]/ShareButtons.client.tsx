"use client"

import { SiFacebook, SiHatenabookmark, SiMastodon, SiMisskey, SiX } from "@icons-pack/react-simple-icons"
import { useExtracted } from "next-intl";
import { useEffect, useState } from "react";
import { FaShareFromSquare } from "react-icons/fa6"

export default function ShareButtons({ postTitle }: {
  postTitle?: string;
}) {
  const t = useExtracted()

  const [showBrowserShareBtn, setShowBrowserShareBtn] = useState(false)

  useEffect(() => {
    if (navigator.share) {
      setShowBrowserShareBtn(true)
    }
  })

  const openPopupUrl = (url: string) => {
    if (window.open) {
      const width = 600;
      const height = 500;

      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const left = (screenWidth - width) / 2;
      const top = (screenHeight - height) / 2 - 24; // ちょっとあげる

      window.open(
        url,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
    <div className='flex gap-2.5 justify-end mt-2'>
      <button className='opacity-60 hover:opacity-90 duration-200 cursor-pointer' onClick={() => {
        const url = new URL('https://twitter.com/intent/tweet')
        url.searchParams.set('text', postTitle + ' | Korange\n' + location.href)
        url.searchParams.set('related', 'korange753')
        openPopupUrl(url.toString())
      }}>
        <SiX className='w-5.5 h-5.5 overflow-visible' />
      </button>
      <button className='opacity-60 hover:opacity-90 duration-200 cursor-pointer' onClick={() => {
        const url = new URL('https://www.facebook.com/share.php')
        url.searchParams.set('u', location.href)
        openPopupUrl(url.toString())
      }}>
        <SiFacebook className='w-5.5 h-5.5 overflow-visible' />
      </button>
      <button className='opacity-60 hover:opacity-90 duration-200 cursor-pointer' onClick={() => {
        const url = new URL('https://misskey-hub.net/share/')
        url.searchParams.set('text', postTitle + ' | Korange')
        url.searchParams.set('url', location.href)
        openPopupUrl(url.toString())
      }}>
        <SiMisskey className='w-5.5 h-5.5 overflow-visible' />
      </button>
      <button className='opacity-60 hover:opacity-90 duration-200 cursor-pointer'>
        <SiMastodon className='w-5.5 h-5.5 overflow-visible' />
      </button>
      <button className='opacity-60 hover:opacity-90 duration-200 cursor-pointer' onClick={() => {
        const url = new URL('https://b.hatena.ne.jp/entry/panel/')
        url.searchParams.set('url', location.href)
        openPopupUrl(url.toString())
      }}>
        <SiHatenabookmark className='w-5.5 h-5.5 overflow-visible' />
      </button>
      {showBrowserShareBtn &&
        <button className='opacity-60 hover:opacity-90 duration-200 cursor-pointer' onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: postTitle + ' | Korange',
              url: location.href,
            })
          } else {
            alert(t("お使いのブラウザはリンクの共有をサポートしていません。"))
          }
        }}>
          <FaShareFromSquare className='w-5.5 h-5.5 overflow-visible' />
        </button>
      }
    </div>
  )
}