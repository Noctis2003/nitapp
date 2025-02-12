import React from "react";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});
import ProductCard from "@/components/ProductCard";

function page() {
  return (
    <div className={`w-full   ${poppins.className} flex flex-col flex-grow`}>
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between">
        Marketplace
        <button
          type="button"
          className=" flex items-center gap-2 py-1 px-4 text-xl font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Sell
        </button>
        
      </h1>
      <div className="flex flex-grow flex-wrap xxs:flex-col md:flex-row  md:justify-evenly" >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
    </div>
  );
}

export default page;
