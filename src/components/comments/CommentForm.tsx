"use client"
import { postSchema } from "@/app/api/comments/post/route"
import { getVisitorId } from "@/lib/getVisitorToken.client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRef, useState } from "react"
import { FaCheck, FaCircleCheck, FaCircleXmark, FaHeart, FaMarkdown, FaSpinner } from "react-icons/fa6"
import z from "zod"
const Turnstile = dynamic(() => import("nextjs-turnstile").then(mod => mod.Turnstile), { ssr: false })

export default function CommentForm({
  placeType,
  placeSlug,
  placeLocale,
}: {
  placeType: "post" | "page";
  placeSlug: string;
  placeLocale?: string;
}) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isFirstInputTriggered, setIsFirstInputTriggered] = useState<boolean>(false)
  const [showTurnstile, setShowTurnstile] = useState(false)
  const resolverRef = useRef<(token: string) => void>(null)
  const waitForTurnstile = () => {
    return new Promise<string>((resolve) => {
      resolverRef.current = resolve
    })
  }
  const onFirstInput = async () => {
    
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)

    if (isFirstInputTriggered) return
    setIsFirstInputTriggered(true)
    const {visitorId, visitorToken, skipCaptchaToken} = await getVisitorId({})

    let tsToken = turnstileToken

    if (!skipCaptchaToken) {
      setShowTurnstile(true)
      if (!tsToken) {
        tsToken = await waitForTurnstile()
      }
    }

    const commentBody: z.infer<typeof postSchema> = {
      placeType: placeType,
      placeSlug: placeSlug,
      placeLocale: placeLocale,
      content: textareaValue,
      name: name,
      visitorToken: visitorToken,
      turnstileToken: tsToken ?? undefined,
      skipCaptchaToken: skipCaptchaToken,
    }

    await fetch("/api/comments/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Visitor-Token": visitorToken,
      },
      body: JSON.stringify(commentBody),
    })

    document.getElementById("comments").scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    setIsSending(false)
  }
  const [textareaValue, setTextareaValue] = useState<string>("")
  const tareaWrapper = useRef<HTMLDivElement>(null)
  const onInput = (e) => {
    setTextareaValue(e.target.value)
    if (!isFirstInputTriggered) {
      onFirstInput()
    }
    const textarea = e.target;
    tareaWrapper.current?.style.setProperty('height', 'auto');
    textarea.style.setProperty('height', 'auto');
    tareaWrapper.current?.style.setProperty('height', textarea.scrollHeight + 'px');
    textarea.style.setProperty('height', textarea.scrollHeight + 'px');
  }
  const [name, setName] = useState("");
  const [receiveReplyNotification, setReceiveReplyNotification] = useState(false);
  const [email, setEmail] = useState("");
  const [turnstileError, setTurnstileError] = useState(null);
  return ( <>
    <form onSubmit={onSubmit} className={`${isSending ? 'opacity-70' : ''}`}>
      <ul className='list-disc list-outside ml-3.75 text-xs mb-6 leading-5.5'>
        <li>コメント本文以外は任意項目となっています。</li>
        <li>コメントは管理人の承認または自動承認をもって公開されます。内容によっては公開されないこともありますのでご了承ください。</li>
        <li>入力内容は当サイトの<Link href="/privacy" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">プライバシーポリシー</Link>に基づいて扱われます。</li>
        <li>このサイトは Cloudflare Turnstile によって保護されており、Turnstile の<a href="https://www.cloudflare.com/ja-jp/turnstile-privacy-policy/" className="underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200">プライバシーポリシー</a>が適用されます。</li>
      </ul>
      <div className="flex gap-2.5 items-center bg-[#fdf6ee] px-4.5 py-3 rounded-2xl mb-6">
        <FaCircleCheck className="w-5 h-5 text-[#1388b9]" />
        <span className="text-sm text-[#1388b9]">コメントありがとうございます</span>
      </div>
      <label className='block text-sm mb-1.5'>コメント<span className='ml-0.5 opacity-60'>*</span></label>
      <div className='group bg-[#fdf6ee] rounded-2xl w-full text-[#333333] text-sm flex flex-col [&:has(textarea:focus-visible)]:outline-[#fdf6ee] [&:has(textarea:focus-visible)]:outline-0 [&:has(textarea:focus-visible)]:ring-4 [&:has(textarea:focus-visible)]:ring-[#fdf6ee]/30'>
        <div className="relative z-10" ref={tareaWrapper}>
          <div className="-z-10 px-4.5 pt-4 whitespace-pre-wrap absolute leading-5.5 pointer-events-none inset-0 break-all">
            {textareaValue}
          </div>
          <textarea disabled={isSending} className='z-10 px-4.5 pt-4 w-full grow appearance-none outline-none bg-transparent text-transparent caret-[#333333] resize-none leading-5.5' placeholder='内容を入力してください' cols={43} rows={7} onInput={onInput} value={textareaValue} maxLength={600} />
        </div>
        <div className="px-4.5 pb-4 opacity-0 group-focus-within:opacity-100 duration-300 flex justify-between mt-3">
          <span className="opacity-50 text-xs text-[#333] flex items-center gap-2"><FaMarkdown className="w-3.5 h-3.5 -mt-[2px]" />Markdown記法が使用できます</span>
          <span className={`text-xs text-[#333] ${textareaValue.length > 599 ? 'text-red-500' : textareaValue.length > 500 ? 'text-yellow-600' : 'opacity-50'}`}>{textareaValue?.length || 0}/600</span>
        </div>
      </div>
      <label className='block text-sm mb-1.5 mt-6'>お名前</label>
      <input value={name} disabled={isSending} className='block bg-[#fdf6ee] rounded-2xl w-full text-[#333333] px-4.5 py-3 text-sm focus-visible:outline-[#fdf6ee] focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-[#fdf6ee]/30' placeholder='匿名' onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if (!isFirstInputTriggered) {
          onFirstInput()
        }
      }} />
      <label className="flex items-center mt-6 gap-3">
        <div className="grid-cols-1 w-6 h-6 grid">
          <input type="checkbox" checked={receiveReplyNotification} onChange={(e) => {
            setReceiveReplyNotification(e.target.checked)
          }} disabled={isSending} className='bg-[#fdf6ee]/50 checked:bg-[#fdf6ee] rounded-lg appearance-none row-start-1 col-start-1 cursor-pointer peer focus-visible:outline-[#fdf6ee] focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-[#fdf6ee]/30' />
          <FaCheck className="text-[#1388b9] justify-self-center self-center row-start-1 col-start-1 pointer-events-none w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 ml-px" />
        </div>
        <div className='block text-sm -mt--0.25'>返信をメールで通知する</div>
      </label>
      { receiveReplyNotification && <input disabled={isSending} type="email" className='block bg-[#fdf6ee] rounded-2xl w-full text-[#333333] px-4.5 py-3 leading-0 text-sm mt-3 focus-visible:outline-[#fdf6ee] focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-[#fdf6ee]/30' placeholder='メールアドレス' onInput={onFirstInput} /> }
      { turnstileError && <div className="flex mt-6">
        <FaCircleXmark className={`w-5 h-5 mr-2.5`} />
        <span className={`text-sm`}>エラー：あなたが人間であることを確認できませんでした: {String(turnstileError)}</span>
      </div>}
      {showTurnstile && (
        <Turnstile
          onSuccess={(token) => {
            setTurnstileToken(token)
            resolverRef.current?.(token)
          }}
          onError={(e) => {
            console.error("Turnstile error", e)
            setTurnstileToken(null)
            setTurnstileError(e)
          }}
          onExpire={() => setTurnstileToken(null)}
        />
      )}
      
      <button type="submit" className='bg-[#fdf6ee] rounded-full text-[#1388b9] px-6 py-2.5 block font-bold mt-8 mx-auto text-[0.95em] relative overflow-hidden cursor-pointer focus-visible:outline-[#fdf6ee] focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-[#fdf6ee]/30'>
        コメントを送信する
        { isSending && <div className="absolute inset-0 bg-[#fdf6ee] flex justify-center items-center cursor-default">
          <FaSpinner className="w-5 h-5 animate-spin" />
        </div> }
      </button>
    </form>
  </> )
}