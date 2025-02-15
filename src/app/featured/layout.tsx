"use client";

import { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-300 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only bg-gray-900">Open sidebar</span>
        <svg
          className="w-6 h-6 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-900 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className={`${poppins.className} h-full px-3 py-4 overflow-y-auto`}>
          <ul className="space-y-2 font-medium text-gray-300 flex flex-col gap-5">
            <li>
              <Link href="/featured/paper"
                className="flex items-center p-2 rounded-lg hover:bg-gray-800"
              >
                <Image
                src="/Icons/logout.png"
                alt="logout"
                width={25}
                height={25}
                />
                <span className="ms-3 font-bold">Logout</span>
              </Link>
            </li>
            <li>
              <Link
                href="/featured/sell"
                className="flex items-center p-2 rounded-lg hover:bg-gray-800"
              >
                <Image
                src="/Icons/shop.png"
                alt="shop"
                width={25}
                height={25}
                />
                
                <span className="flex-1 ms-3 font-bold">Shop</span>
              </Link>
            </li>


            <li>
              <Link
                href="/featured/qna"
                className="flex items-center p-2 rounded-lg hover:bg-gray-800"
              >
                <Image
                src="/Icons/question.png"
                alt="shop"
                width={25}
                height={25}
                />
                
                <span className="flex-1 ms-3 font-bold">Doubts</span>
              </Link>
            </li>


            <li>
              <Link
                href="/featured/paper"
                className="flex items-center p-2 rounded-lg hover:bg-gray-800"
              >
             <Image
             src="/Icons/forum.png"
             alt="forum"
             height={25}
              width={25}
             />
                <span className="flex-1 ms-3 font-bold">Forums</span>
              </Link>
            </li>

            <li>
              <Link
                href="/featured/confessions"
                className="flex items-center p-2 rounded-lg hover:bg-gray-800"
              >
             <Image
             src="/Icons/love.png"
             alt="forum"
             height={25}
              width={25}
             />
                <span className="flex-1 ms-3 font-bold">Confessions</span>
              </Link>
            </li>


            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-gray-800"
              >
             <Image
             src="/Icons/handshake.png"
             alt="forum"
             height={30}
              width={30}
             />
                <span className="flex-1 ms-3 font-bold">Collab</span>
              </a>
            </li>



          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 bg-gray-950 text-gray-300 min-h-screen">
        <div className="p-4 rounded-lg">{children}</div>
      </div>
    </>
  );
}
