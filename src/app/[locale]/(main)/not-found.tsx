// src/app/[locale]/(main)/not-found.tsx

import PageTransitionRunner from "@/components/PageTransitionRunner";
import { getExtracted, getLocale } from "next-intl/server";;
import { FaArrowLeft } from "react-icons/fa6";
import { Metadata } from "next";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

import boatSvg from "@/assets/404boat.svg"

export async function generateMetadata({params}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getExtracted({locale});
 
  return {
    title: t('404 Not Found | Korange'),
    description: t('お探しのページは見つかりませんでした。')
  };
}

export default async function NotFound() {
  const t = await getExtracted();

  return (
    <div className="mt-13 overflow-hidden">
      <PageTransitionRunner />

      <div className="flex flex-col h-[calc(100dvh-3.25rem-2.25rem)] sm:h-[calc(100vh-3.25rem)] page_transition overflow-hidden">
        <div className="flex-2 text-center relative z-10">
          <div className="absolute -bottom-8 w-full select-none pointer-events-none page_transition">
            <Image src={boatSvg} alt="" className="h-46 translate-y-16 rotate-5 w-auto mx-auto z-50 " />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center pb-22">
            <h2 className="text-5xl tracking-wider font-semibold font-poppins page_transition">404</h2>
            <p className="mt-4 tracking-wide page_transition">お探しのページは見つかりませんでした。</p>
            <div className="mt-4 flex justify-start">
              <Link href="/" className="text-[#fdf6ee]/80 hover:text-[#fdf6ee]/90 duration-200 flex items-center gap-2 group page_transition">
                <FaArrowLeft className="w-3 h-3 duration-200" />
                <span>{t('ホームに戻る')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-3 bg-[#fdf6ee] h-full relative select-none pointer-events-none overflow-x-hidden">
          <div className="absolute -top-px -right-px -left-px w-[135%] sm:w-[calc(100%+1px)]">
            <div className="overflow-hidden">
              <svg width="1500" height="27" viewBox="0 0 1500 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M75 16.5904C58.3333 30.4699 41.6667 30.4699 25 16.5904C16.6667 9.6506 8.33333 6.18072 0 6.18072V0H1500V6.18072C1491.67 6.18072 1483.33 9.6506 1475 16.5904C1458.33 30.4699 1441.67 30.4699 1425 16.5904C1408.33 2.71084 1391.67 2.71084 1375 16.5904C1358.33 30.4699 1341.67 30.4699 1325 16.5904C1308.33 2.71084 1291.67 2.71084 1275 16.5904C1258.33 30.4699 1241.67 30.4699 1225 16.5904C1208.33 2.71084 1191.67 2.71084 1175 16.5904C1158.33 30.4699 1141.67 30.4699 1125 16.5904C1108.33 2.71084 1091.67 2.71084 1075 16.5904C1058.33 30.4699 1041.67 30.4699 1025 16.5904C1008.33 2.71084 991.667 2.71084 975 16.5904C958.333 30.4699 941.667 30.4699 925 16.5904C908.333 2.71084 891.667 2.71084 875 16.5904C858.333 30.4699 841.667 30.4699 825 16.5904C808.333 2.71084 791.667 2.71084 775 16.5904C758.333 30.4699 741.667 30.4699 725 16.5904C708.333 2.71084 691.667 2.71084 675 16.5904C658.333 30.4699 641.667 30.4699 625 16.5904C608.333 2.71084 591.667 2.71084 575 16.5904C558.333 30.4699 541.667 30.4699 525 16.5904C508.333 2.71084 491.667 2.71084 475 16.5904C458.333 30.4699 441.667 30.4699 425 16.5904C408.333 2.71084 391.667 2.71084 375 16.5904C358.333 30.4699 341.667 30.4699 325 16.5904C308.333 2.71084 291.667 2.71084 275 16.5904C258.333 30.4699 241.667 30.4699 225 16.5904C208.333 2.71084 191.667 2.71084 175 16.5904C158.333 30.4699 141.667 30.4699 125 16.5904C108.333 2.71084 91.6667 2.71084 75 16.5904Z" fill="#1388B9"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
