"use client"

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import korangeIconSvg from "@/assets/icon.svg"

import { FaBars, FaXmark } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import MainSidebar from "./MainSidebar";

export default function MobileNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.scrollbarGutter = "auto";
    } else {
      document.body.style.overflow = "";
      document.body.style.scrollbarGutter = "stable";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarGutter = "stable";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="flex justify-between md:hidden fixed top-0 left-0 w-full pb-4 pt-4 px-[1.25rem] px--[1.5rem] bg-[#1388B980] z-50 backdrop-blur-lg">
        <Link href="/" className="flex">
          <Image src={korangeIconSvg} alt="Logo" className="w-7" />
          <div className="text-[#FDF6EE] text-[0.75rem] leading-[108%] mt-auto pl-4 font-poppins">Korange's<br />Site</div>
        </Link>

        <button className="js-only" onClick={() => {
          setIsSidebarOpen(true)
        }} aria-label="Menu">
          <FaBars className="text-[#FDF6EE] w-7.5 h-7.5 cursor-pointer p-1.5 -mx-1.5" />
        </button>
        { !isJsEnabled && <div className="nojs-only flex flex-col justify-center" id="menu-container">
          <input type="checkbox" id="menu-toggle-nojs" className="hidden" />
          <div
            className={`
              menu-menu 
              absolute top-0 left-0 h-dvh
              w-full overflow-hidden
              bg-[#1388b9] px-7
            `}
          >
            <MainSidebar withAnimation={true} className="h-full" closeSidebar={() => setIsSidebarOpen(false)} />
          </div>
          <label id="menu-label" htmlFor="menu-toggle-nojs" className="absolute block z-[999] my-[4px] right-[1.75rem]">
            <FaBars className="menu-bars text-[#FDF6EE] w-7.5 h-7.5 cursor-pointer p-1.5 -mx-1.5" />
            <FaXmark className="menu-close text-[#FDF6EE] w-7.5 h-7.5 cursor-pointer p-1.5 -mx-1.5" />
          </label>
          <style>{`
            .menu-menu {
              display: none;
            }
            .menu-close {
              display: none;
            }
            #menu-toggle-nojs:checked ~ .menu-menu {
              display: block !important;
            }
            #menu-container:has(#menu-toggle-nojs:checked) .menu-close {
              display: block !important;
            }
            #menu-container:has(#menu-toggle-nojs:checked) .menu-bars {
              display: none !important;
            }
          `}</style>
        </div> }
      </nav>

      <div
        className={`
          fixed inset-0 z-50
          transition-opacity duration-250
          ${isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
        onClick={() => setIsSidebarOpen(false)}
      > 
        {/* Sidebar */}
        { isSidebarOpen && (
          <div
            className={`
              absolute top-0 left-0 h-dvh
              w-full overflow-hidden
              bg-[#1388b9] px-7
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <MainSidebar withAnimation={true} className="h-full" closeSidebar={() => setIsSidebarOpen(false)} />
            <button className="fixed right-5 top-5 needs-js" onClick={() => {
              setIsSidebarOpen(false)
            }}>
              <FaXmark className="text-[#FDF6EE] w-7.5 h-7.5 cursor-pointer p-1.5 -mx-1.5" />
            </button>
          </div>
        ) }
      </div>
    </>
  )
}