"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Poppins } from "next/font/google";
import { useState } from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});
export default function InfiniteMovingCardsDemo() {
  const [showTextbox, setShowTextbox] = useState(false);
  const [speed, setSpeed] = useState("slow");

  return (
    <div className={` ${poppins.className} h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden`}>
      <button 
        className="absolute font-extrabold xxs:top-0 md:top-3 right-3 xxs:py-1 xxs:px-3 md:px-6 md:py-3 bg-[#3B82F6] text-white  rounded-xl shadow-lg transition-all hover:bg-red-700 active:scale-95"
        onClick={() => {
          setShowTextbox(!showTextbox);
          setSpeed("slow");
        }}
      >
        Confess
      </button>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed={speed}
      />

      {showTextbox && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-96 shadow-lg">
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button 
              onClick={() => setShowTextbox(false)} 
              className="mt-4 w-full font-bold px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Confess
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
