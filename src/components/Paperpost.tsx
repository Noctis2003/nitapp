import React from "react";
import { ThumbsUp } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import Link from "next/link";
function Paperpost({id , name, description, date, comments, likes,title}:{id:string , name: string, description: string, date: string, comments: number, likes: number, title: string}) {
  return (
  
    <div className="xxs:w-full md:w-2/3 border-b border-gray-700 mt-4 px-5 py-5 text-white">
      <h1 className="text-xs text-gray-400 ">
        by <span className="text-blue-400 underline cursor-pointer hover:text-blue-500">{name}</span>
      </h1>
        <Link href={`forum/${id}`}>
      <h1 className="mt-2 font-extrabold text-2xl w-full text-gray-100 cursor-pointer">
        {title}
      </h1>
      </Link>
      <div className="mt-2 text-gray-400">
       {description}
        <div className="w-full text-xs mt-4 flex flex-row gap-6">
          <div className="flex items-center justify-center">Nov 12, 2024</div>
          <div className="flex flex-row gap-1 items-center justify-center ">
         <MessageCircle />
           {comments}
          </div>
         
          <div className="flex flex-row gap-1 items-center justify-center ">
    
          <ThumbsUp  />
           {likes}   
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default Paperpost;
