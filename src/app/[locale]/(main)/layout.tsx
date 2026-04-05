import "@/app/globals.css";
import MobileNav from "@/components/MobileNav";
import MainSidebar from "@/components/MainSidebar";
//import { headers } from "next/headers";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function MainLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  //const session = await auth.api.getSession({
  //  headers: await headers()
  //})

  //const isAdmin = session?.user.github_name === "k0range"

  return (
    <NextIntlClientProvider>
      <div className="bg-[#1388B9] text-[#FDF6EE] min-h-screen ">
        <MobileNav key={locale} />

        <div className="w-full max-w-[82rem] md:px-[1.75rem] mx-auto flex gap-8 relative">
          <div className="hidden md:block">
            <MainSidebar
              locale={locale}
              className="md:sticky md:top-0 md:w-42 lg:w-56 md:h-screen"
              //showAdminLink={isAdmin}
            />
          </div>

          <main className="flex-1 pt-9 md:pt-0">
            {children}
          </main>

          <aside className="hidden xl:block w-56 sticky top-10 h-full">
          </aside>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
