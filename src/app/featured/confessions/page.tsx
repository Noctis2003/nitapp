// i will tell you how this arrow functionality works
// what we did is first we started with event listeners
// when left key is pressed we call the prevSlide function
// when right key is pressed we call the nextSlide function
// prevslide function is just a function that decrements the current index by 1 
// and nextSlide function increments the current index by 1
"use client";
import { Poppins } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from '@/lib/axios';
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
    // Add the domain to the graffiti icons
    const newPositions = Array.from({ length: 50 }, () => ({
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
          className="absolute text-white opacity-50 pointer-events-none select-none"
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
  // Initialize notes as an empty array instead of undefined
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    const handleResize = () => {
      checkMobile();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        const res = await axios.get("http://localhost:4000/gossip/get", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        console.log("Fetched notes:", res.data.data);
        
        // Ensure we always set an array, even if API returns null/undefined
        const fetchedNotes = Array.isArray(res.data.data) ? res.data.data : [];
        setNotes(fetchedNotes);
        
        // Reset current index if notes array is empty
        if (fetchedNotes.length === 0) {
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Ensure we always have an array
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const nextSlide = () => {
    // Add null check for notes
    if (!notes || notes.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
  };

  const prevSlide = () => {
    // Add null check for notes
    if (!notes || notes.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + notes.length) % notes.length);
  };

  // Add keyboard event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [notes]); // Re-add listener if notes changes

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    // Minimum swipe distance (in pixels) to register as a swipe
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right to left (previous)
        prevSlide();
      } else {
        // Swiped left to right (next)
        nextSlide();
      }
    }
  };

  const onSubmit = async (data: NoteFormData) => {
    try {
      setShowTextbox(false);
      const res = await axios.post("http://localhost:4000/gossip/create", {
        content: data.content,
      }, {
        withCredentials: true,
      });

      // Add the new note to the list and navigate to it
      const updatedNotes = [...(notes || []), { content: data.content }];
      setNotes(updatedNotes);
      setCurrentIndex(updatedNotes.length - 1);
      reset();
    } catch (error) {
      console.error("Error posting note:", error);
    }
  };

  return (
    <div
      className={`${poppins.className} min-h-screen text-white xxs::px-0 xxs:py-6 md:p-6 relative overflow-hidden mt-3`}
    >
      <GraffitiLayer />

      <h1 className="xxs:mt-10 md:mt-4 text-3xl font-bold mb-6 text-center">🧻 Gossip Wall </h1>

      {/* Add a hint about navigation based on device */}
      {!loading && notes && notes.length > 0 && (
        <p className="text-center text-white/50 text-sm mb-4">
          {isMobile 
            ? "Swipe left or right to navigate between secrets" 
            : "Use left and right arrow keys to navigate between secrets"}
        </p>
      )}

      <button
        onClick={() => setShowTextbox(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-800 transition-all z-50"
      >
        Write Something ✍️
      </button>

      {/* Carousel Container */}
      <div className="relative md:max-w-2xl mx-auto mt-10 h-auto xxs:w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-white/70 text-xl">Loading juicy secrets...</p>
          </div>
        ) : !notes || notes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-white/70 text-xl">No secrets yet! Be the first to share.</p>
          </div>
        ) : (
          <>
            {/* Carousel Card with touch events */}
            <div 
              ref={carouselRef}
              className="carousel-container h-full flex items-center justify-center touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="bg-gray-950 rounded-xl p-6 shadow-lg w-full h-full flex items-center justify-center transition-all duration-300"
              >
                {/* Add bounds checking for currentIndex */}
                <p className={`${shadows.className} text-2xl text-center`}>
                  {notes[currentIndex]?.content || "Content not available"}
                </p>
              </div>
            </div>
            
            {/* Navigation Indicator */}
         
          </>
        )}
      </div>

      {showTextbox && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center backdrop-blur-md justify-center">
          <div className="bg-gray-900 border border-white/20 rounded-xl p-6 w-96 shadow-xl">
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