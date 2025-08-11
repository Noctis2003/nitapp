"use client";
import React from "react";
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import Link from "next/link";

import api from "@/lib/axios";
import { useEffect } from "react";

function Paperpost({id , name, description, comments, likes,title}:{id:string , name: string, description: string, date: string, comments: number, likes: number, title: string}) {
  const [likesCount, setLikesCount] = React.useState(likes);
  const [liked, setLiked] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/forum/liked`,
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
    // Optimistic UI update
    const wasLiked = liked;
    const previousCount = likesCount;
    
    // Update UI immediately
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    
    try {
      const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/forum/like`, {
        postId: Number(id),
      }, { withCredentials: true });
    
      // Verify the response matches our optimistic update
      if(response.data.message === "Post unliked successfully") {
        console.log(response.data.message);
        // UI already updated optimistically
      }
      else if(response.data.message === "Post liked successfully") {
        console.log(response.data.message);
        // UI already updated optimistically
      }
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      setLiked(wasLiked);
      setLikesCount(previousCount);
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
         
          {/* Enhanced Like Button with Better Feedback */}
          <div className="flex flex-row gap-2 items-center justify-center">
            <button 
              onClick={like}
              className={`
                relative p-1.5 rounded-full transition-all duration-300 ease-out
                hover:bg-gray-800/50 active:scale-90 active:bg-gray-700/70
                ${liked ? 'hover:bg-red-900/20' : 'hover:bg-gray-800/50'}
                ${isAnimating ? 'animate-pulse scale-110' : 'scale-100'}
                focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-1 focus:ring-offset-gray-900
              `}
              disabled={isAnimating}
            >
              <Heart
                className={`
                  w-4 h-4 transition-all duration-300 ease-out
                  ${liked ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                  ${isAnimating ? 'animate-bounce' : ''}
                `}
                color={liked ? "#ef4444" : "#94a3b8"}
                fill={liked ? "#ef4444" : "none"}
                strokeWidth={liked ? 2 : 1.5}
              />
              
              {/* Enhanced particle effects */}
              {isAnimating && liked && (
                <>
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping opacity-80"></div>
                  <div className="absolute -top-2 left-0 w-1 h-1 bg-red-300 rounded-full animate-ping animation-delay-100 opacity-60"></div>
                  <div className="absolute -bottom-1 -right-0.5 w-1 h-1 bg-red-500 rounded-full animate-ping animation-delay-200 opacity-50"></div>
                  <div className="absolute top-0 -left-1 w-0.5 h-0.5 bg-red-400 rounded-full animate-ping animation-delay-300 opacity-40"></div>
                </>
              )}
              
              {/* Ripple effect on click */}
              {isAnimating && (
                <div className="absolute inset-0 rounded-full border border-red-400/30 animate-ping"></div>
              )}
            </button>
            
            <span 
              className={`
                font-medium transition-all duration-300 ease-out select-none
                ${liked ? 'text-red-400 scale-105 font-semibold' : 'text-gray-400'}
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