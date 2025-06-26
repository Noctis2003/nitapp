// This page shows collabs in a beautiful, card-like layout
"use client";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface User {
  email: string;
}

interface Collab {
  id: string;
  name: string;
  description: string;
  user?: User;
}

export default function CollabListPage() {
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const [localOnly, setLocalOnly] = useState("local");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://nitappbackend.onrender.com/collab/get", {
          withCredentials: true,
          params: { scope: localOnly },
        });
        console.log("Collabs:", response);
        setCollabs(response.data);
      } catch (error) {
        console.error("❌ Failed to load collabs:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log(localOnly);
    fetchCollabs();
  }, [localOnly]);

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-950 text-white flex items-center justify-center ${poppins.className}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Loading Missions</h3>
            <p className="text-gray-400">Discovering live collaborations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-950 text-white ${poppins.className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-4xl max-md:mt-5 md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Explore Live Missions
              </h1>
            </div>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              These are the sparks waiting for the right minds to ignite them. 
              Join forces and create something extraordinary.
            </p>
          </div>

          {/* Toggle Section */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl blur opacity-20"></div>
              <div className="relative flex bg-gray-900 border border-cyan-500/30 rounded-2xl p-1 shadow-xl">
                <button
                  onClick={() => setLocalOnly("local")}
                  className={`relative px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    localOnly === "local"
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                      : "text-cyan-300 hover:text-cyan-200 hover:bg-gray-800"
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Local</span>
                  </span>
                </button>
                <button
                  onClick={() => setLocalOnly("global")}
                  className={`relative px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    localOnly === "global"
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                      : "text-cyan-300 hover:text-cyan-200 hover:bg-gray-800"
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                    <span>Global</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {collabs.map((collab, idx) => (
              <div
                key={idx}
                onClick={() => router.push(`/featured/collab/${collab.id}`)}
                className="group relative cursor-pointer"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-3xl p-8 h-full flex flex-col justify-between shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500 group-hover:border-cyan-400/50 group-hover:-translate-y-1">
                  
                  {/* Card Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-cyan-300 mb-4 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
                      {collab.name}
                    </h2>
                    
                    <p className="text-gray-400 leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors duration-300">
                      {collab.description.length > 150 
                        ? `${collab.description.substring(0, 150)}...`
                        : collab.description
                      }
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-6 border-t border-gray-700/50">
                    {collab.user?.email ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Mission Lead</p>
                          <p className="text-cyan-400 text-sm font-medium">{collab.user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Open Mission</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && collabs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-3">No Active Missions</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Be the first to launch a new collaboration in the {localOnly} space. 
                Great ideas are waiting to be discovered.
              </p>
            </div>
          )}
        </div>

        {/* Fixed Deploy Button */}
        <button
          onClick={() => router.push("/featured/collab/post")}
          className="fixed bottom-8 right-8 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-gray-900 border border-cyan-500/50 text-cyan-300 px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-200 group-hover:-translate-y-1">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-bold">Deploy Mission</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}