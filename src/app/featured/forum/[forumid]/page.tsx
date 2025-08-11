"use client";
import React from 'react';
import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import { useState } from 'react';

import api from '@/lib/axios'; // Adjust the import path as necessary
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'next/navigation';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});



function Page() {
  const { forumid } = useParams();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [open , setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<ForumData | null>(null);
  const [loading, setLoading] = useState(true);

type ForumData = {
  data: {
    title: string;
    description: string;
  };
}
  
  const formSchema = z.object({
    content: z.string().min(1, "Content is required"),
  });

  const onsubmit = async (data: FormData) => {
    

    setSubmitted(true);
     await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/forum/comment`,
      {
        postId: Number(forumid),
        content: data.content,
      },
      { withCredentials: true }
    );

    setSubmitted(false);
    
    setOpen(false);
   
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

 type Comment = {
    id: number;
    content: string;
    user: {
      email: string;
    };
    createdAt: string;
  };


  useEffect(() => {
    const fetchForumData = async () => {  
      try {

        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/forum/getsingle?id=${forumid}`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching forum data:', error);
      }
      
    }

    const fetchComments = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/forum/comments?postId=${forumid}`,
          { withCredentials: true }
        );
       
        setComments(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }


    const execute = async () => {
      try {
        setLoading(true);
        await fetchForumData();
        await fetchComments();
      }
      catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  
   execute();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


if (loading) {
    return (
      <div className={`min-h-screen bg-gray-950 text-white flex items-center justify-center w-full ${poppins.className}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-yellow-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Loading comments</h3>
            <p className="text-gray-400">I hope you like my app</p>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className={`min-h-screen text-white ${poppins.className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0"></div>
      
      <div className="relative z-10 flex flex-col items-center  lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 max-md:mt-10">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight break-words px-2">
              {data? data.data.title : 'Loading...'}
            </h1>
            
            <div className="w-full mx-auto space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed px-3 sm:px-2 break-words">
               {data ? data.data.description : 'Loading...'}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl mx-2 sm:mx-0">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-800/50">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white flex flex-col xs:flex-row xs:items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span className="break-words">Community Feedback</span>
                </div>
                <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full self-start xs:ml-2 flex-shrink-0">
                  {comments.length} comments
                </span>
              </h2>
            </div>
            
            <div className="divide-y divide-gray-800/30">
              {comments.map((comment:Comment, index:number) => (
                <div 
                  key={comment.id}
                  className="px-3 sm:px-4 lg:px-6 py-4 sm:py-5 hover:bg-gray-800/30 transition-colors duration-200"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`
                  }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Avatar */}
                  
                    
                    {/* Comment Content */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mb-2">
                        <h3 className="text-blue-400 font-medium text-xs sm:text-sm truncate">
                          @{comment.user.email}
                        </h3>
                        <span className="text-gray-500 text-xs hidden xs:inline flex-shrink-0">•</span>
                        <span className="text-gray-500 text-xs flex-shrink-0">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-sm sm:text-base break-words overflow-wrap-anywhere">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Comment Button */}
            <div className="px-3 sm:px-4 lg:px-6 py-4 bg-gray-900/30 border-t border-gray-800/30">
              <button 
                onClick={() => setOpen(true)} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base"
              >
                💬 Join the conversation
              </button>
            </div>
          </div>

          {open && (
            <div className={`${poppins.className} font-medium fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md z-50 p-3 sm:p-4`}>
              <div className="bg-gray-900/50 border border-gray-800/50 backdrop-blur-2xl rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-xs xs:max-w-sm sm:max-w-md shadow-2xl relative mx-2">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6 text-center break-words">
                  💬 Join the Discussion
                </h3>

                <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
                  <textarea
                    {...register("content")}
                    placeholder="Write your comment..."
                    className="w-full h-24 sm:h-28 lg:h-32 resize-none p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/70 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                  {errors.content && (
                    <p className="text-sm text-red-400 break-words">{errors.content.message}</p>
                  )}

                  <div className="flex flex-col xs:flex-row justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 py-2.5 sm:py-2 rounded-lg sm:rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitted}
                      className="flex-1 py-2.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
                    >
                      {submitted ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16 px-4">
            <p className="text-gray-500 text-xs sm:text-sm break-words">
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
        
        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .xs\\:flex-row { flex-direction: row; }
          .xs\\:items-center { align-items: center; }
          .xs\\:gap-2 { gap: 0.5rem; }
          .xs\\:ml-2 { margin-left: 0.5rem; }
          .xs\\:inline { display: inline; }
          .xs\\:max-w-sm { max-width: 24rem; }
        }
      `}</style>
    </div>
  );
}

export default Page;