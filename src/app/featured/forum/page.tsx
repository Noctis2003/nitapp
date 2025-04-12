import React from "react";
import { Poppins } from "next/font/google";
import Paperpost from "@/components/Paperpost";
import Forumbutton from "@/components/Forumbutton";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function Page() {
  return (
    <div className={`w-full  flex flex-col flex-grow ${poppins.className} bg-gray-950 text-white xxs:mt-9 md:mt-0`}>
      <h1 className="w-full text-center text-5xl font-extrabold xxs:mt-6 md:mt-3">
        Daily Feed </h1>
      <div
        className="p-4 text-center text-sm mt-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
        role="alert"
      >
        You can post whatever you want.{" "}
       <Forumbutton/>
      </div>
      <div className="h-full flex flex-col mt-5 xxs:ml-1 md:ml-12 space-y-4">
        <Paperpost />
        <Paperpost />
        <Paperpost />
        <Paperpost />
      </div>
    </div>
  );
}

export default Page;
