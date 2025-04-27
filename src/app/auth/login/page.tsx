"use client";

import { Poppins } from "next/font/google";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const graffitiIcons = [
 "💊",
  "💉",
  "🩹",
  "🧬",
  "🌿",
  "🧪",
  "🫙",
  "🧻",
  "🚬",
  "🍄",
  "🩺",
  "⚗️",
  "🥼",
  "🔬",
];


function GraffitiLayer() {
  const [positions, setPositions] = useState<
    { top: string; left: string; rotate: string; emoji: string; size: string }[]
  >([]);

  useEffect(() => {
    const newPositions = Array.from({ length: 50 }, () => ({
      top: `${Math.floor(Math.random() * 90)}%`,
      left: `${Math.floor(Math.random() * 90)}%`,
      rotate: `${Math.floor(Math.random() * 360)}deg`,
      emoji: graffitiIcons[Math.floor(Math.random() * graffitiIcons.length)],
      size: `${Math.floor(Math.random() * 24) + 12}px`,
    }));
    setPositions(newPositions);
  }, []);

  const funkyLightColors = [
    'bg-pink-300',
    'bg-cyan-300',
    'bg-lime-300',
    'bg-yellow-300',
    'bg-rose-300',
    'bg-orange-300',
    'bg-emerald-300',
    'bg-purple-300',
    'bg-sky-300',
    'bg-fuchsia-300',
  ];
  // punjabi ban gye coder oyee
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className={` ${funkyLightColors[i%10]} absolute text-white opacity-[0.5] pointer-events-none select-none rounded-3xl`}
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


function Page() {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setApiError("");
      const res = await axios.post("http://localhost:4000/auth/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("token", res.data.access_token);
        router.push("/featured/collab");
      }
    } catch (err) {
      if (err.response) {
        setApiError(err.response.data.message || "Login failed");
      } else {
        setApiError("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div
      className={`h-screen w-screen flex items-center justify-center bg-gray-900 ${poppins.className} overflow-hidden flex flex-grow`}
    >
      <GraffitiLayer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[390px] flex flex-col items-center p-6 rounded-lg shadow-lg backdrop-blur-lg md:border md:bg-gray-800/30"
      >
        <h1 className="mb-6 text-2xl font-bold text-center text-white">
          Hi, Welcome back 👋
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="w-full mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full mt-4 px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="w-full mt-1 text-sm text-red-400">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="w-3/4 mt-6 px-3 py-2 rounded-lg bg-[#0E64D2] text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center gap-4 my-4 w-full">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-sm font-medium text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
          type="button"
          onClick={() => router.push("/auth/signup")}
          className="w-4/5 px-3 py-2 rounded-lg bg-green-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Sign up
        </button>

        {apiError && (
          <p className="mt-4 text-sm text-center text-red-400">{apiError}</p>
        )}
      </form>
    </div>
  );
}

export default Page;
