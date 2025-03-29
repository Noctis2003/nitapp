import React from "react";
import { Poppins } from "next/font/google";
import Posts from "@/components/Posts";
import Link from "next/link";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});

function Page() {
  return (
    <div className={`h-full flex flex-col xxs:mt-10 md:mt-0 items-center bg-gray-950 text-gray-300 ${poppins.className}`}>
      <div className="mt-5 xxs:w-full md:w-4/5 text-3xl font-extrabold gap-3 flex xxs:flex-col sm:flex-row xs:justify-end lg:justify-between px-4">
        <div className="flex flex-col ">
          Welcome to Doubtrooms <br />
          <span className="text-xs font-light mt-1 text-gray-400">
            Find answers to your technical questions and help others answer theirs.
          </span>
        </div>
        <Link href="/featured/qna/ask" >
        <button className="rounded-xl text-lg bg-blue-500 h-[40px] px-3 " >
          Post
        </button>
        </Link>
      </div>
      <div className="p-4 mb-4 text-sm text-blue-400 rounded-lg bg-gray-800 mt-5 xxs:w-full md:w-4/5">
        <span className="font-medium">Important </span>
        <br />
        ● You have the option to filter doubts based on your preference—you can choose to see and post doubts only within your branch or explore and engage with doubts from all branches.
        <br />
      </div>
      <div className="xxs:w-full md:w-3/4 mt-3 text-2xl font-bold flex-col">
        Interesting posts for you
        <Posts />
        <Posts />
        <Posts />
        <Posts />

      </div>
    </div>
  );
}

export default Page;
