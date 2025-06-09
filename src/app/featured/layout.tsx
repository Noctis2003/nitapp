"use client";

import { useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation"; // Import useRouter

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const toggleSidebar = () => {
    setRotated(!rotated);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = async () => {
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include", // <== VERY IMPORTANT for sending cookies
    });
    console.log("Logged out successfully");
    router.push("/"); // Navigate after logout
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSidebarOpen(false), // Collapse on left swipe
    onSwipedRight: () => setIsSidebarOpen(true), // Expand on right swipe
  });

  return (
    <>
      <nav
        {...handlers}
        className="fixed md:hidden top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between sm:justify-start sm:pl-8 z-50"
      >
        <div className={` ${poppins.className} text-xl font-bold`}>
          CollegeHub
        </div>

        <button
          type="button"
          className="sm:hidden p-2 text-gray-300 rounded-lg"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Image
            className={`transition-transform duration-300 ${
              rotated ? "rotate-90" : ""
            }`}
            src="/Icons/menu.png"
            alt="shop"
            width={35}
            height={35}
          />
        </button>
      </nav>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-900 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className={`${poppins.className} h-full px-3 py-4 overflow-y-auto`}>
          <ul className="space-y-2 font-medium text-gray-300 flex flex-col gap-5 xxs:mt-20 md:mt-5">
            <li>
              <button
                onClick={logout}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 w-full text-left"
              >
                <Image
                  src="/Icons/logout.png"
                  alt="logout"
                  width={25}
                  height={25}
                />
                <span className="ms-3 font-bold">Logout</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/featured/sell")}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 w-full text-left"
              >
                <Image
                  src="/Icons/shop.png"
                  alt="shop"
                  width={25}
                  height={25}
                />
                <span className="flex-1 ms-3 font-bold">Sell</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/featured/forum")}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 w-full text-left"
              >
                <Image
                  src="/Icons/forum.png"
                  alt="forum"
                  height={25}
                  width={25}
                />
                <span className="flex-1 ms-3 font-bold">Forums</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/featured/confessions")}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 w-full text-left"
              >
                <Image
                  src="/Icons/love.png"
                  alt="confessions"
                  height={25}
                  width={25}
                />
                <span className="flex-1 ms-3 font-bold">Confessions</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/featured/collab")}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 w-full text-left"
              >
                <Image
                  src="/Icons/handshake.png"
                  alt="collab"
                  height={30}
                  width={30}
                />
                <span className="flex-1 ms-3 font-bold">Collab</span>
              </button>
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
