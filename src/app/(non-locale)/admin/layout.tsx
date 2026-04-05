import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import AdminLogin from "./AdminLogin";
import NoAccess from "./NoAccess";
import AdminSidebar from "./_components/AdminSidebar";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "管理者ログイン - Korange",
  robots: {
    index: false
  },
};

export default async function Layout({ children }: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <NextIntlClientProvider>
      {session?.user.github_name === "k0range" ? (
        <div className="bg-[#1388B9] text-[#FDF6EE] min-h-screen ">        
          <div className="w-full max-w-[82rem] md:px-[1.75rem] mx-auto flex gap-8 relative">
            <div className="hidden md:block">
              <AdminSidebar className="
                md:sticky md:top-0 md:w-42 lg:w-56 md:h-screen
              " />
            </div>
        
            <main className="flex-1 pt-9 md:pt-0">
              {children}
            </main>
        
            <aside className="hidden xl:block w-56 sticky top-10 h-full">
            </aside>
          </div>
        </div>
      ) : session === null ? (
        <AdminLogin />
      ) : (
        <NoAccess />
      )}
    </NextIntlClientProvider>
  )
}