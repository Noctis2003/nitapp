"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Sellbutton from "@/components/Sellbutton";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

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
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://nitappbackend.onrender.com/shop/all", {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={`w-full ${poppins.className} flex flex-col xxs:mt-8 md:mt-0 flex-grow`}>
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between xxs:mt-8 md:mt-0">
        Marketplace
        <Sellbutton />
      </h1>
      <div
        className={`flex flex-grow flex-wrap xxs:flex-col md:flex-row ${
          products.length === 1 ? "md:justify-start" : "md:justify-between"
        }`}
      >
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
