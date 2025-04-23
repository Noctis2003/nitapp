// This page shows collabs in a beautiful, card-like layout
"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import axios from "axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function CollabListPage() {
  const [collabs, setCollabs] = useState([]);
  const [localOnly, setLocalOnly] = useState(false);

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const endpoint = localOnly
          ? "http://localhost:4000/collab/local"
          : "http://localhost:4000/collab/all";
        const response = await axios.get(endpoint, { withCredentials: true });
        setCollabs(response.data);
      } catch (error) {
        console.error("❌ Failed to load collabs:", error);
      }
    };

    fetchCollabs();
  }, [localOnly]);

  return (
    <div className={`min-h-screen bg-gray-950 text-white px-4 py-10 ${poppins.className}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center mb-4 flex items-center justify-center gap-3">
          <Sparkles className="animate-bounce" />
          Explore Live Missions
        </h1>

        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          These are the sparks waiting for the right minds to ignite them.
        </p>

        <div className="flex justify-center mb-6">
          <div className="flex border border-cyan-500/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setLocalOnly(true)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                localOnly ? "bg-cyan-600 text-white" : "bg-gray-800 text-cyan-300"
              }`}
            >
              Local
            </button>
            <button
              onClick={() => setLocalOnly(false)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                !localOnly ? "bg-cyan-600 text-white" : "bg-gray-800 text-cyan-300"
              }`}
            >
              Global
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collabs.map((collab, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 p-6 rounded-3xl shadow-[0_0_20px_#22d3ee22]"
            >
              <h2 className="text-xl font-bold text-cyan-300 mb-2">
                🚀 {collab.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">
                {collab.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {collab.roles.map((role, rIdx) => (
                  <span
                    key={rIdx}
                    className="bg-cyan-600/20 text-cyan-300 text-xs px-3 py-1 rounded-full"
                  >
                    {role.roleName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
