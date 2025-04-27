// This page shows collabs in a beautiful, card-like layout
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function CollabListPage() {
  
  const [collabs, setCollabs] = useState([]);
  const [localOnly, setLocalOnly] = useState("local");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/collab/get", {
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

  return (
    <div
      className={`flex flex-grow mt-4 bg-gray-950 text-white px-4 py-10 ${poppins.className}`}
    >
      <div className="max-w-5xl mx-auto mt-3">
    
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center mb-4 flex flex-row items-center gap-0 md:justify-center md:gap-4  ">
      
          <div>
          Explore Live Missions
          </div>
        </h1>

        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          These are the sparks waiting for the right minds to ignite them.
        </p>

        <div className="flex justify-center mb-6">
          <div className="flex border border-cyan-500/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setLocalOnly("local")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                localOnly === "local"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-800 text-cyan-300"
              }`}
            >
              Local
            </button>
            <button
              onClick={() => setLocalOnly("global")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                localOnly === "global"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-800 text-cyan-300"
              }`}
            >
              Global
            </button>
          </div>
        </div>

        <div className=" flex flex-wrap gap-6 flex-col justify-start  items-start mt-3 relative">
          {loading ? (
            <p className="text-center w-full absolute mx-auto text-gray-400 col-span-full">
              Loading missions...
            </p>
          ) : (
            collabs.map((collab, idx) => (
              <div
                key={idx}
                className="border-2 border-cyan-500 shadow-cyan-500/50 p-4 xxs:w-full md:w-auto h-30  flex flex-grow flex-col justify-between mt-12 from-gray-900 to-gray-80 rounded-3xl shadow-[0_0_20px_#22d3ee22]"
              >
                <h2 className="text-xl font-bold text-cyan-300 mb-2">
                  {collab.name}
                </h2>
                <p className="text-gray-400 xxs:text-sm md:text-base mb-2">
                  {
                     `${collab.description.substring(0,200)}...`
                    }
                </p>
                {/* NEW: Show User's Email */}
                {collab.user && collab.user.email && (
                  <p className="text-gray-500 text-xs">
                    <span className="text-cyan-400">{collab.user.email}</span>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fixed Post Collab Button */}
      <button
        onClick={() =>
          router.push("/featured/collab/post")
        }
        className="fixed bottom-6 right-6 bg-gray-800 font-bold text-cyan-300 py-2.5 px-5 rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-700 z-50"
      >
        + Post Collab
      </button>
    </div>
  );
}
