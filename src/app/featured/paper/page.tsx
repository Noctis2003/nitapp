import React from "react";
import { Poppins } from "next/font/google";
import { ThumbsUp } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
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
        <div className=" xxs:w-full  md:w-1/2 border-b   px-5 py-5 ">
          <h1 className="text-xs text-gray-600">
            by <span className="text-blue-600 underline">Manjot Singh</span>
          </h1>
          <h1 className="mt-2 font-extrabold text-2xl w-full ">
            Why experienced programmers fail coding interviews ?
          </h1>
          <div className="mt-2 text-gray-500">
            Exploring my most loved Software Architecture patterns and their
            practical applications.
            <div className="w-full text-xs mt-4 flex flex-row gap-6">
              <div className="flex items-center justify-center">Nov 12,2024</div>
              <div className="flex flex-row gap-1 items-center justify-center " >
              <ThumbsUp color="grey" fill="none" size="17" />
                234</div>
                <div className="flex flex-row gap-1 items-center justify-center " >
                <MessageCircle color="grey" fill="none" size="17" />

                234</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
