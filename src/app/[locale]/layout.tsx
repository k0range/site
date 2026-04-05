import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import "@/app/globals.css";
import "@/assets/styles/page_transition.css"
import "@/assets/styles/article_content.css"
import Script from "next/script";
import { notFound } from "next/navigation";
import { getExtracted, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap',
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "600", "700"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Korange",
  openGraph: {
    images: [
      { url: "/og.png" }
    ]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {  
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  setRequestLocale(locale);

  const t = await getExtracted();

  return (
    <html lang={locale} style={{
      scrollbarGutter: "stable"
    }}>
      <head>
        <style>
          {`
          :root {
            --nojs-hide: none;
            --js-only-hide: unset;
          }

          .nojs-only { display: var(--nojs-hide, unset); }
          .js-only   { display: var(--js-only-hide, unset); }
          `}
        </style>
        <noscript>
          <style>
            {`
            :root {
              --nojs-hide: unset;
              --js-only-hide: none;
            }

            .page_transition {
              opacity: 0;
              transform: translateY(16px);
              animation: fadeUp 400ms forwards;
              animation-timing-function: cubic-bezier(0.3, 0.35, 0.22, 0.95);
            }
                        
            @keyframes fadeUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }`}
          </style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${notoSansJp.variable} ${poppins.variable} antialiased`}
      >
        <NextTopLoader
          color="#fdf6ee50"
          height={4}
          showSpinner={false}
        />
        {children}
        
        <Script>
          {`console.log(\`\n%c________%c__%c__%c__________\n__%c________%c____________\n________%c__%c____________\n____%c____%c____%c______%c____\n__%c______%c__%c________%c____\n__%c______________%c______\n%c______________%c________\n%c____________%c__________\n%c______________%c________\n__%c______________%c______\n__%c______%c__%c________%c____\n____%c____%c____%c______%c____%c\n\n${t("ご訪問ありがとうございます🍊")}\n\n%c- Korange's Site\n%c_\`, "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;","background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;","background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;","background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;","background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;","background-color: #1388b9; color: #1388b9;", "background-color: transparent; color: transparent;", "", "color: #5cadcf; font-weight: bold;", "background-color: transparent; color: transparent;")`}
        </Script>
      </body>
    </html>
  );
}
