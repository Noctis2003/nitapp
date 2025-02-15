"use client"; 

import React, { useState } from "react";

const GlassyTextbox = () => {
  const [showTextbox, setShowTextbox] = useState(false);

  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      <button  onClick={() => setShowTextbox(!showTextbox)} className=" absolute  xxs:top-0 md:top-3 right-3 xxs:py-1 xxs:px-3 md:px-6 md:py-3 bg-[#3B82F6] text-white font-semibold rounded-xl shadow-lg transition-all hover:bg-red-700 active:scale-95">
  Confess
</button>
        

      {showTextbox && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-96 shadow-lg">
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button 
              onClick={() => setShowTextbox(false)} 
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlassyTextbox;
