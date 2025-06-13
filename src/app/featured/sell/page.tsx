import React from "react";
import { Poppins } from "next/font/google";
import Sellbutton from "@/components/Sellbutton";
import { cookies } from 'next/headers';
import axios from '@/lib/axios';
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});
import ProductCard from "@/components/ProductCard";


async function page() {

  const cookieStore = cookies();
  const token = (await cookieStore).get('jwt')?.value;
  const refreshToken = (await cookieStore).get('refresh_token')?.value;
  const res= await fetch("http://localhost:4000/shop/all", {
    method: "GET",
    headers: {
      'cookie': `jwt=${token}; refresh_token=${refreshToken}`,
      "Content-Type": "application/json",
      
    },
    
  });
const products = await res.json();

  return (
    <div className={`w-full   ${poppins.className} flex flex-col  xxs:mt-8 md:mt-0 flex-grow`}>
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between xxs:mt-8 md:mt-0">
        Marketplace
        <Sellbutton/>
      </h1>
      <div className={` flex flex-grow flex-wrap xxs:flex-col md:flex-row  ${products.length===1 ? 'md:justify-start':'md:justify-between'} `} >
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={`₹${product.price}`}
            description={product.description}
            image={product.image}
          />
        ))}
        </div>
    </div>
  );
}

export default page;
