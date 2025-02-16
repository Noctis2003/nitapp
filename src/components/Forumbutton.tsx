"use client";
import React, { useState } from "react";

function Forumbutton() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      {/* Post Button */}
      <span className="font-medium underline text-blue-400 cursor-pointer hover:text-blue-500">
        <button className="underline" onClick={() => setIsOpen(true)}>
          Post here
        </button>
      </span>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-500 w-[90%] md:w-[50%]">
            <h2 className="text-lg font-bold text-white">Create a Post</h2>

            {/* Title Input */}
            <input
              type="text"
              className="w-full mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Content Textarea */}
            <textarea
              className="w-full mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
              placeholder="What's on your mind?"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 font-bold"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-bold"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Forumbutton;
