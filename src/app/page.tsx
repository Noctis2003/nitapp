"use client";
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import {TextGenerateEffect} from "@/components/ui/text-generate-effect";
import ColourfulText from "@/components/ui/colourful-text";

import { signIn} from "next-auth/react";
export default function BackgroundLinesDemo() {
  const array=["Ready to play?"]

   const words=array[Math.floor(Math.random() * array.length)];
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-7xl md:text-7xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      
      <button className="w-auto h-auto" onClick={() => signIn('google', { callbackUrl: 'https://nitapp-ysdi.vercel.app/auth/sync' })} >
      <ColourfulText  text="Click me" />
      </button>
      
      </h2>
      <div className="max-w-xl mx-auto text-sm md:text-lg text-neutral-400 dark:text-neutral-400 text-center">
      <TextGenerateEffect words={words}/>
      </div>
    </BackgroundLines>
  );
}
