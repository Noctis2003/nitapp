import React from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Sellbutton from "@/components/Sellbutton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});
import ProductCard from "@/components/ProductCard";

function page() {

  return (
    <div className={`w-full   ${poppins.className} flex flex-col flex-grow xxs:mt-8 md:mt-0`}>
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between xxs:mt-8 md:mt-0">
        Marketplace
        <Sellbutton/>
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
