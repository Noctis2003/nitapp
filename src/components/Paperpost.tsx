import React from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";

function Paperpost() {
  return (
    <div className="xxs:w-full md:w-2/3 border-b border-gray-700 mt-4 px-5 py-5 text-white">
      <h1 className="text-xs text-gray-400">
        by <span className="text-blue-400 underline cursor-pointer hover:text-blue-500">Manjot Singh</span>
      </h1>
      <h1 className="mt-2 font-extrabold text-2xl w-full text-gray-100">
        Why experienced programmers fail coding interviews?
      </h1>
      <div className="mt-2 text-gray-400">
        Exploring my most loved Software Architecture patterns and their
        practical applications.
        <div className="w-full text-xs mt-4 flex flex-row gap-6">
          <div className="flex items-center justify-center">Nov 12, 2024</div>
          <div className="flex flex-row gap-1 items-center justify-center ">
            <ThumbsUp className="text-gray-400 hover:text-blue-400 cursor-pointer" size="17" />
            234
          </div>
          <div className="flex flex-row gap-1 items-center justify-center ">
          <MessageCircle 
  className="text-gray-500 hover:text-green-300 cursor-pointer transition-all duration-200 drop-shadow-md hover:drop-shadow-xl" 
  size="17" 
  color="currentColor" 
  fill="currentColor" 
/>


            234
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paperpost;
