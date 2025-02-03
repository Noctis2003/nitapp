import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import {TextGenerateEffect} from "@/components/ui/text-generate-effect";
import ColourfulText from "@/components/ui/colourful-text";

export default function BackgroundLinesDemo() {
  const array=["Often the people you don't expect anything of can do the things that are most unexpected.","Singularity is coming.","These are confusing times.","The right man in the wrong place can make all the difference in the world.","Universe does have a cruel sense of humor.","ADHD is my superpower.","No friends only political allies.","Dil toh bachha hai ji.","Let's milk the system."]
  
   const words=array[Math.floor(Math.random() * array.length)];
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-7xl md:text-7xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      <ColourfulText text="Lets go" />
      </h2>
      <div className="max-w-xl mx-auto text-sm md:text-lg text-neutral-400 dark:text-neutral-400 text-center">
      <TextGenerateEffect words={words}/>
      </div>
    </BackgroundLines>
  );
}
