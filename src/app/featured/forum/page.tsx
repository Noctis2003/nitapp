// This is a server component
// one must never quit
import React from "react";
import { cookies } from "next/headers"; // ⭐ VERY IMPORTANT ⭐
import { Poppins } from "next/font/google";
import Paperpost from "@/components/Paperpost";
import Forumbutton from "@/components/Forumbutton";
import axios from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

async function Page() {
  const cookieStore = await cookies();  // 🌟 get cookies
  const cookieString = cookieStore.toString(); // turn them into a string

  const response = await axios.get("http://localhost:4000/forum/get", {
    headers: {
      Cookie: cookieString, // 👑 manually attach cookies
    },

  });
  return (
    <div className={`w-full flex flex-col flex-grow ${poppins.className} bg-gray-950 text-white xxs:mt-9 md:mt-0`}>
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
      
        {Array.isArray(response.data.data) ? (
          response.data.data.map((post) => (
            <Paperpost
              key={post.id}
              title={post.title}
              description={`${post.description.substring(0, 100)}...`}
              name={post.user.email}
              date={post.createdAt}
              likes={post.likes}
              comments={post.comments}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
