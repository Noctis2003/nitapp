"use client";
import React, { use } from "react";
import { ThumbsUp } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import Link from "next/link";
import axios from '@/lib/axios';
import { useEffect } from "react";
import { set } from "date-fns";

function Paperpost({id , name, description, date, comments, likes,title}:{id:string , name: string, description: string, date: string, comments: number, likes: number, title: string}) {
  const [likesCount, setLikesCount] = React.useState(likes);
  const [liked, setLiked] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/forum/liked`,
          { postId: Number(id) }, // body
          { withCredentials: true } // config
        );
        console.log(response.data);
        setLiked(response.data);
      } catch (error) {
        console.error("Error checking if post is liked:", error);
      }
    };
    checkIfLiked();
  }, [id]);

  const like = async () => {
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    
    try {
      const response = await axios.post(`http://localhost:4000/forum/like`, {
        postId: Number(id),
      }, { withCredentials: true });
    
      if(response.data.message === "Post unliked successfully" && likesCount > 0) {
        setLiked(false);
        console.log(response.data.message);
        setLikesCount(likesCount - 1);
      }
      else if(response.data.message === "Post liked successfully") {
        console.log(response.data.message);
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  return (
    <div className="xxs:w-full md:w-2/3 border-b border-gray-700 mt-4 px-5 py-5 text-white">
      <h1 className="text-xs text-gray-400 ">
        by <span className="text-blue-400 underline cursor-pointer hover:text-blue-500 transition-colors duration-200">{name}</span>
      </h1>
      <Link href={`forum/${id}`}>
        <h1 className="mt-2 font-extrabold text-2xl w-full text-gray-100 cursor-pointer hover:text-white transition-colors duration-200">
          {title}
        </h1>
      </Link>
      <div className="mt-2 text-gray-400">
        {description}
        <div className="w-full text-xs mt-4 flex flex-row gap-6">
          <div className="flex items-center justify-center text-gray-500">
            Nov 12, 2024
          </div>
          
          {/* Enhanced Comment Section */}
          <div className="flex flex-row gap-2 items-center justify-center group cursor-pointer hover:text-blue-400 transition-colors duration-200">
            <MessageCircle 
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
              strokeWidth={1.5}
            />
            <span className="font-medium">{comments}</span>
          </div>
         
          {/* Enhanced Like Button */}
          <div className="flex flex-row gap-2 items-center justify-center">
            <button 
              onClick={like}
              className={`
                relative p-1 rounded-full transition-all duration-200 ease-in-out
                hover:bg-gray-800 active:scale-95
                ${isAnimating ? 'animate-pulse' : ''}
              `}
            >
              <ThumbsUp
                className={`
                  w-4 h-4 transition-all duration-300 ease-in-out
                  ${liked ? 'scale-110' : 'scale-100'}
                  ${isAnimating ? 'animate-bounce' : ''}
                `}
                color={liked ? "#ef4444" : "#94a3b8"}
                fill={liked ? "#ef4444" : "none"}
                strokeWidth={1.5}
              />
              {/* Animated heart particles effect */}
              {isAnimating && liked && (
                <>
                  <div className="absolute -top-2 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -top-1 -left-1 w-1 h-1 bg-cyan-300 rounded-full animate-ping animation-delay-150 opacity-60"></div>
                  <div className="absolute -bottom-1 right-0 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping animation-delay-300 opacity-50"></div>
                </>
              )}
            </button>
            <span 
              className={`
                font-medium transition-all duration-300
                ${liked ? 'text-red-400 scale-105' : 'text-gray-400'}
                ${isAnimating ? 'animate-pulse' : ''}
              `}
            >
              {likesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paperpost;