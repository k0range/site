"use client"

import PageTransitionRunner from "@/components/PageTransitionRunner"
import korangeIconSvg from "@/assets/icon.svg"
import Image from "next/image"
import { FaGithub, FaSpinner } from "react-icons/fa6"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useState } from "react"

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    authClient.signIn.social({
      provider: "github",
      callbackURL: `${window.location.origin}/admin`
    })
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="text-center pb-12">
          <Image src={korangeIconSvg} alt="Logo" className="w-9 mx-auto mb-6 page_transition" />
          <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">管理者ログイン</h2>
          <button className="flex items-center bg-[#fdf6ee] rounded-full text-[#1388b9] px-10 py-2 font-bold mx-auto relative overflow-hidden cursor-pointer page_transition disabled:cursor-default disabled:opacity-75 duration-200 hover:opacity-92" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <FaSpinner className="w-5 h-5 inline align-middle mr-1 animate-spin" />
            ) : (
              <SiGithub className="w-5 h-5 inline align-middle mr-1" />
            )}
            <span className="pl-1.5 pr-0.75">GitHub で認証</span>
          </button>
          <div className="page_transition mt-10">
            <Link href="/" className="text-[#FDF6EE] text-sm opacity-50 underline-offset-5 underline decoration-[#fdf6ee]/75 hover:opacity-70 duration-200">サイトに戻る</Link>
          </div>
        </div>
      </main>

      <PageTransitionRunner />
    </>
  )
}