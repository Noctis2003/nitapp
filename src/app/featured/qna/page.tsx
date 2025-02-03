import React from "react";
import { Poppins } from "next/font/google";
import Posts from "@/components/Posts";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});

function page() {
  return (
    <div className={`h-full flex flex-col  items-center ${poppins.className} `}>
      <div className="  mt-5   xxs:w-full md:w-4/5 text-3xl  font-extrabold  gap-3  flex  xxs:flex-col sm:flex-row  xs:justify-end lg:justify-between  px-4">
        <div className="flex flex-col ">
          Welcome to Doubtrooms <br />
          <span className="text-xs font-light mt-1 text-gray-400">
            Find answers to your technical questions and help others answer
            theirs.
          </span>
        </div>
        <button className="text-sm border  border-blue-700  rounded-xl h-6 px-6 py-5  flex items-center font-light text-blue-500 ">
          Ask question
        </button>
      </div>
      <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 mt-5  xxs:w-full md:w-4/5">
        <span className="font-medium">Important </span>
        <br />
        ●You have the option to filter doubts based on your preference—you can
        choose to see and post doubts only within your branch or explore and
        engage with doubts from all branches.
        <br />
      </div>
      <div className="  xxs:w-full md:w-3/4 mt-3  text-2xl font-bold flex-col ">
        Interesting posts for you
        <Posts/>
      </div>
    </div>
  );
}

export default page;
