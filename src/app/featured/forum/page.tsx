"use client"; // ⭐ VERY IMPORTANT ⭐

import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import Paperpost from "@/components/Paperpost";
import Forumbutton from "@/components/Forumbutton";
import usePostStore from "@/store/usePostStore";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export type Post = {
  id: string;
  title: string;
  description: string;
  user: {
    email: string;
  };
  createdAt: string;
  likes: [];
  comments: [];
};

const Page = () => {
  
    const { posts, loading, error, fetchPosts } = usePostStore();

  useEffect(() => {
   fetchPosts();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


   if (loading) {
    return (
      <div className={`min-h-screen bg-gray-950 text-white flex items-center justify-center w-full ${poppins.className}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Finding top feeds</h3>
            <p className="text-gray-400">Thanks for being patient</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col flex-grow ${poppins.className} bg-gray-950 text-white xxs:mt-9 md:mt-0`}
    >
      <h1 className="w-full text-center text-5xl font-extrabold xxs:mt-6 md:mt-3">
        Daily Feed
      </h1>
      <div
        className="p-4 text-center text-sm mt-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
        role="alert"
      >
        You can post whatever you want. <Forumbutton />
      </div>

      <div className="h-full flex flex-col mt-5 xxs:ml-1 md:ml-12 space-y-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post: Post) => (
            <Paperpost
              key={post.id}
              id={post.id}
              title={post.title}
              description={`${post.description.substring(0, 100)}...`}
              name={post.user.email}
              date={post.createdAt}
              likes={post.likes.length}
              comments={post.comments.length}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
