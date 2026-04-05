"use client"

import PageTransitionRunner from "@/components/PageTransitionRunner"
import korangeIconSvg from "@/assets/icon.svg"
import Image from "next/image"
import { FaGithub } from "react-icons/fa6"
import { SiGit, SiGithub } from "@icons-pack/react-simple-icons"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function NoAccess() {
  const router = useRouter();
  const session = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut({
      callbackURL: `${window.location.origin}/admin`
    })
    router.refresh();
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="text-center pb-12">
          <Image src={korangeIconSvg} alt="Logo" className="w-9 mx-auto mb-6 page_transition" />
          <h2 className="text-[#FDF6EE] text-2xl mb-6 font-semibold page_transition">アクセス権限がありません</h2>
          <div className="opacity-75">
            <p className="text-[#FDF6EE] text-sm mb-6 page_transition">{session?.data?.user?.github_name ? <><SiGithub className="w-4 h-4 inline align-middle mr-2" />@{session.data.user.github_name} としてログインしています</> : '管理画面にアクセスする権限がありません'}</p>
          </div>
          <button className="flex items-center bg-[#fdf6ee] rounded-full text-[#1388b9] px-10 py-2 font-bold mx-auto relative overflow-hidden cursor-pointer page_transition" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </main>

      <PageTransitionRunner />
    </>
  )
}