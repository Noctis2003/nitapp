import React from "react";
import { Poppins } from "next/font/google";
import Sellbutton from "@/components/Sellbutton";
import axios from "axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});
import ProductCard from "@/components/ProductCard";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

async function page() {

 
 
 
  const response = await axios.get("https://nitappbackend.onrender.com/shop/all", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, 
  });
  const products: Product[] = response.data;

  return (
    <div className={`w-full   ${poppins.className} flex flex-col  xxs:mt-8 md:mt-0 flex-grow`}>
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between xxs:mt-8 md:mt-0">
        Marketplace
        <Sellbutton/>
      </h1>
      <div className={` flex flex-grow flex-wrap xxs:flex-col md:flex-row  ${products.length===1 ? 'md:justify-start':'md:justify-between'} `} >
        {products.map((product: Product) => (
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
