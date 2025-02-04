import React from "react";
import { Poppins } from "next/font/google";
import Paperpost from "@/components/paperpost";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});

function page() {
  return (
    <div className={`w-full  h-screen flex flex-col ${poppins.className} `}>
      <h1 className="w-full  text-center text-5xl font-extrabold mt-4">
        Daily feed
      </h1>
      <div
        className="p-4 text-center text-sm mt-3 text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
        role="alert"
      >
        You can post whatever you want .{" "}
        <span className="font-medium underline text-blue-600">Post here</span>
      </div>
      <div className="h-full  flex flex-col mt-5  xxs:ml-1 md:ml-12">
      <Paperpost />
      <Paperpost />
      <Paperpost />
      <Paperpost />
      
      
      </div>
    </div>
  );
}

export default page;
