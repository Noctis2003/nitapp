"use client";
import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
function Page({ params }: { params: { forumid: string } }) {
 
  const comments = [
    {
      id: 1,
      username: 'mistri',
      message: 'This app is really impressive! The UI feels super smooth and modern. Great job!',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      username: 'devguru',
      message: 'How did you handle authentication? Is it using NextAuth or something custom?',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      username: 'codequeen',
      message: 'I love the color scheme! Did you use Tailwind for all the styling?',
      timestamp: '45 minutes ago'
    },
    {
      id: 4,
      username: 'student42',
      message: 'Can you share more about the backend setup? Was NestJS easy to integrate?',
      timestamp: '30 minutes ago'
    },
    {
      id: 5,
      username: 'mistri',
      message: 'Thanks for the feedback everyone! Yes, Tailwind and NextAuth were both used. Happy to answer more questions!',
      timestamp: '15 minutes ago'
    }
  ];

  return (
    <div className={`min-h-screen  text-white ${poppins.className} `}>
      {/* Background decoration */}
      <div className="absolute inset-0 "></div>
      
      <div className="relative z-10 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16">
           
            
            <h1 className="text-6xl md:text-6xl font-bold mb-6   leading-tight">
              How did I make this app?
            </h1>
            
            <div className="w-full mx-auto space-y-4">
              <p className="text-xl text-gray-300 leading-relaxed">
                This app is built using Next.js, Tailwind CSS, and NestJS. It features a modern UI with smooth animations and a responsive design. The backend is powered by NestJS, providing a robust API for data handling.
                 This app is built using Next.js, Tailwind CSS, and NestJS. It features a modern UI with smooth animations and a responsive design. The backend is powered by NestJS, providing a robust API for data handling. This app is built using Next.js, Tailwind CSS, and NestJS. It features a modern UI with smooth animations and a responsive design. The backend is powered by NestJS, providing a robust API for data handling. This app is built using Next.js, Tailwind CSS, and NestJS. It features a modern UI with smooth animations and a responsive design. The backend is powered by NestJS, providing a robust API for data handling. This app is built using Next.js, Tailwind CSS, and NestJS. It features a modern UI with smooth animations and a responsive design. The backend is powered by NestJS, providing a robust API for data handling. This app is built using Next.js, Tailwind CSS, and NestJS. It features a modern UI with smooth animations and a responsive design. The backend is powered by NestJS, providing a robust API for data handling.
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
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-blue-400 font-medium text-sm">
                          @{comment.username}
                        </h3>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Comment Button */}
            <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800/30">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25">
                💬 Join the conversation
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm">
              Built with ❤️ and lots of ☕ • Open to feedback and collaboration
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