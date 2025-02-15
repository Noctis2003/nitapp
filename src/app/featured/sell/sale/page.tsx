"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function SellPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ productName, description, image });
    // Handle form submission logic here
  };

  return (
    <div className={`w-full ${poppins.className} flex flex-col flex-grow  px-4  py-6`}> 
      <h1 className="text-3xl font-extrabold px-2 py-2 flex justify-between">
        Sell Your Product
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12 mt-4">
      <input
  type="text"
  placeholder="Product Name"
  value={productName}
  onChange={(e) => setProductName(e.target.value)}
  className="xxs:w-full md:w-1/3 px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
/>

<textarea
  placeholder="Brief Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="xxs:w-full md:w-1/2 px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
/>

<div className="relative w-full md:w-1/4">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
  <button
    type="button"
    className=" xxs:w-full md:w-2/3 px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800"
  >
    Upload Image
  </button>
</div>
        <button
          type="submit"
          className=" xxs:w-full md:w-[150px] py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default SellPage;
