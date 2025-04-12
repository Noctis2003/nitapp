"use client";

import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const graffitiIcons = [
  "😈", "💋", "💀", "🧃", "🚬", "🔥", "🎧", "👀", "🔪", "🥀", "🌀", "✨","nitj","nitj","nitj"
];


function GraffitiLayer() {
  const [positions, setPositions] = useState<
    { top: string; left: string; rotate: string; emoji: string; size: string }[]
  >([]);

  useEffect(() => {
    const newPositions = Array.from({ length: 40 }, () => ({
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      rotate: `${Math.floor(Math.random() * 360)}deg`,
      emoji: graffitiIcons[Math.floor(Math.random() * graffitiIcons.length)],
      size: `${Math.floor(Math.random() * 24) + 12}px`,
    }));
    setPositions(newPositions);
  }, []);

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute text-white opacity-[0.5] pointer-events-none select-none"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate})`,
            fontSize: pos.size,
          }}
        >
          {pos.emoji}
        </div>
      ))}
    </>
  );
}

export default function ToiletWall() {
  const [showTextbox, setShowTextbox] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [input, setInput] = useState("");

  const handlePost = () => {
    if (input.trim() !== "") {
      setNotes([
        { quote: input, name: "Anon", title: "Stall Whisper" },
        ...notes,
      ]);
      setInput("");
      setShowTextbox(false);
    }
  };

  return (
    <div
      className={`${poppins.className} min-h-screen text-white p-6 relative overflow-hidden`}
    >
      {/* Graffiti background layer */}
      <GraffitiLayer />

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">🧻 Gossip Wall</h1>

      {/* Button to post */}
      <button
        onClick={() => setShowTextbox(true)}
        className="fixed bottom-6 right-6 bg-[#8B5CF6] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-800 transition-all z-50"
      >
        Write Something ✍️
      </button>

      {/* Notes List */}
      <div className="flex flex-col gap-4 mt-4 z-10 relative">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-md hover:scale-[1.02] transition-all"
          >
            <p className="text-lg">{note.quote}</p>
            <div className="mt-2 text-sm opacity-60">
              — {note.name} • <i>{note.title}</i>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for writing */}
      {showTextbox && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1f1f1f] border border-white/20 rounded-xl p-6 w-96 shadow-xl">
            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Spill your secrets..."
              className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handlePost}
              className="mt-4 w-full font-bold px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              Post on the Wall 🚽
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const initialNotes = [
  {
    quote: "I changed my friend's alarm to ‘Bach ke rehna re baba’. He still doesn't know.",
    name: "Troublemaker",
    title: "Classic Prank",
  },
  {
    quote: "Someone stole my lunch in 2nd grade and I still think about it.",
    name: "Still Hungry",
    title: "Unresolved Trauma",
  },
  {
    quote: "I fake laugh at my boss’s jokes so well I should get an Oscar.",
    name: "Corporate Clown",
    title: "Office Truths",
  },
];
