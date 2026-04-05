import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "@/app/globals.css";
import "@/assets/styles/page_transition.css"
import "@/assets/styles/article_content.css"

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
  title: "管理者ダッシュボード - Korange",
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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="ja" style={{
      scrollbarGutter: "stable"
    }}>
      <body
        className={`${inter.variable} ${notoSansJp.variable} ${poppins.variable} antialiased`}
      >
        <NextTopLoader
          color="#fdf6ee50"
          height={4}
          showSpinner={false}
        />
        {children}
      </body>
    </html>
  );
}
