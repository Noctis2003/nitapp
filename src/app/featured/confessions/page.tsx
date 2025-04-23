"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Shadows_Into_Light } from "next/font/google";
import { Patrick_Hand } from "next/font/google";

const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400" });
const shadows = Shadows_Into_Light({ subsets: ["latin"], weight: "400" });

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

const graffitiIcons = [
  "😈", "💋", "💀", "🧃", "🚬", "🔥", "🎧", "👀", "🔪", "🥀", "🌀", "✨"
];

const noteSchema = z.object({
  content: z.string().min(5, "Please write something meaningful..."),
});

type NoteFormData = z.infer<typeof noteSchema>;

type Note = {
  content: string;
};

function GraffitiLayer() {
  const [positions, setPositions] = useState<
    { top: string; left: string; rotate: string; emoji: string; size: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const domain = await axios.get("http://localhost:4000/auth/email",{
        withCredentials: true,
      });
      console.log("Domain:", domain.data.domain);
      graffitiIcons.push(domain.data.domain);
      graffitiIcons.push(domain.data.domain); // Add the domain to the graffiti icons

      const newPositions = Array.from({ length: 50 }, () => ({
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
        rotate: `${Math.floor(Math.random() * 360)}deg`,
        emoji: graffitiIcons[Math.floor(Math.random() * graffitiIcons.length)],
        size: `${Math.floor(Math.random() * 24) + 12}px`,
      }));
  
      setPositions(newPositions);
    };
  
    fetchData();
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
  const [notes, setNotes] = useState<Note[]>([]); // Ensure notes is initialized as an empty array
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/gossip/get");
        console.log("Fetched notes:", res.data.data); // Log the fetched notes
        setNotes(res.data.data); // Set the notes state with the fetched data
       
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Fallback to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const onSubmit = async (data: NoteFormData) => {
    try {
      setShowTextbox(false);
     const res = await axios.post("http://localhost:4000/gossip/create", {
        content: data.content,
      }, {
        withCredentials: true, // send cookies (if HttpOnly auth is used)
      }
     )

      reset();
    
    } catch (error) {
      console.error("Error posting note:", error);
    }
  };

  return (
    <div
      className={`${poppins.className} min-h-screen text-white p-6 relative overflow-hidden`}
    >
      <GraffitiLayer />

      <h1 className="text-3xl font-bold mb-6 text-center">🧻 Gossip Wall </h1>

      <button
        onClick={() => setShowTextbox(true)}
        className="fixed bottom-6 right-6 bg-[#8B5CF6] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-800 transition-all z-50"
      >
        Write Something ✍️
      </button>

      <div className="flex flex-col gap-4 mt-4 z-10 relative">
        {loading ? (
          <p className="text-center text-white/70">Loading juicy secrets...</p>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md w-3/4 border mx-auto border-white/20 mt-4  rounded-xl p-4 shadow-md hover:scale-[1.02] transition-all"
            >
              <p className={`${shadows.className} text-2xl`}>{note.content}</p>
            </div>
          ))
        )}
      </div>

      {showTextbox && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1f1f1f] border border-white/20 rounded-xl p-6 w-96 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                {...register("content")}
                rows={4}
                placeholder="Spill your secrets..."
                className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.content && (
                <p className="text-red-400 text-sm mt-2">{errors.content.message}</p>
              )}
              <button
                type="submit"
                className="mt-4 w-full font-bold px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
              >
                Post on the Wall 🚽
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
