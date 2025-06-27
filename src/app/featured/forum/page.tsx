"use client"; // ⭐ VERY IMPORTANT ⭐

import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Paperpost from "@/components/Paperpost";
import Forumbutton from "@/components/Forumbutton";
import axios from "axios";

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://nitappbackend.onrender.com/forum/get",
          {
            withCredentials: true,
          }
        );
        setPosts(response.data.data);
      } catch (err) {
        setError("Failed to fetch posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
