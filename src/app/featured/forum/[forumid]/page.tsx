"use client";
import React, { use } from 'react';
import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '@/lib/axios';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatDistanceToNow, set } from 'date-fns';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});



function Page({ params }: { params: { forumid: String } }) {
  const { forumid } = use(params);
  const [data, setData] = useState<any>(null);
 const [comments, setComments] = useState<any>([]);
  const [open , setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formSchema = z.object({
    content: z.string().min(1, "Content is required"),
  });
const onsubmit = async (data: FormData) => {
console.log(data);
setSubmitted(true);
const response = await axios.post(
  `http://localhost:4000/forum/comment`,
  {
    postId: Number(forumid),
    content: data.content,
  },
  { withCredentials: true }
);

setSubmitted(false);
setOpen(false);
console.log(response.data);

}
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

useEffect(() => {
  const fetchForumData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/forum/getsingle?id=${forumid}`,
        { withCredentials: true }
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching forum data:', error);
    }
  }



  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/forum/comments?postId=${forumid}`,
        { withCredentials: true }
      );
     
      setComments(response.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  console.log(comments.length);
  fetchForumData();
  fetchComments();
 
}, []);


  

  return (
    <div className={`min-h-screen  text-white ${poppins.className} `}>
      {/* Background decoration */}
      <div className="absolute inset-0 "></div>
      
      <div className="relative z-10 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16">
           
            
            <h1 className="text-6xl md:text-6xl font-bold mb-6   leading-tight">
              {data ? data.data.title : 'Loading...'}
            </h1>
            
            <div className="w-full mx-auto space-y-4">
              <p className="text-xl text-gray-300 leading-relaxed">
               {data ? data.data.description : 'Loading...'}
              </p>
            </div>
          </div>

  
          {/* Comments Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 px-6 py-4 border-b border-gray-800/50">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                Community Feedback
                <span className="ml-2 bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {comments.length} comments
                </span>
              </h2>
            </div>
            





 <div className="divide-y divide-gray-800/30">
              {comments.map((comment, index) => (
                <div 
                  key={comment.id}
                  className="px-6 py-5 hover:bg-gray-800/30 transition-colors duration-200"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      
                    </div>
                    
                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-blue-400 font-medium text-sm">
                          @{comment.user.email}
                        </h3>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>







          
            
            {/* Add Comment Button */}
            <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800/30">
              <button onClick={()=>{
                setOpen(true);
              }} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25">
                💬 Join the conversation
              </button>
            </div>
          </div>


       {open && (
  <div className={`${poppins.className} font-medium fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md z-50`}>
    <div className="bg-gray-900/50 border border-gray-800/50 backdrop-blur-2xl rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 text-center">
        💬 Join the Discussion
      </h3>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <textarea
          {...register("content")}
          placeholder="Write your comment..."
          className="w-full h-32 resize-none p-4 rounded-xl bg-gray-800/70 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
        />
        {errors.content && (
          <p className="text-sm text-red-400">{errors.content.message}</p>
        )}

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitted}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 disabled:opacity-50"
          >
            {submitted ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm">
              Built with ❤️ and lots of 🌿💨 Open to feedback and collaboration
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Page;