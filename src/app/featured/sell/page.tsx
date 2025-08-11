"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Sellbutton from "@/components/Sellbutton";

import api from "@/lib/axios"; // Adjust the import path as necessary
import ProductCard from "@/components/ProductCard";
// this is how you make it.

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  phone?: string; // Optional field for phone number
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    const fetchProducts = async () => {
      
      try {
        setLoading(true);
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/shop/all`, {
          withCredentials: true,
        });
        setProducts(response.data);
        ;
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-950 text-white flex items-center justify-center w-full ${poppins.className}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-green-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-400 mb-2">Loading Products</h3>
            <p className="text-gray-400">Thanks for being patient</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full ${poppins.className} flex flex-col xxs:mt-8 md:mt-0 flex-grow`}>
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between xxs:mt-8 md:mt-0">
        Marketplace
        <Sellbutton />
      </h1>
      <div
        className={`w-full max-md:mx-auto grid grid-cols-1 gap-4 md:grid-cols-3  md:mx-5`}
      >
      


        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={`₹${product.price}`}
            description={product.description}
            image={product.image}
            phone={product.phone}
          />
        ))}
      </div>
    </div>
  );
}
