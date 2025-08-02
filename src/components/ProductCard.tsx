"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function ProductCard({
  name,
  price,
  description,
  image,
  phone,
}: {
  name: string;
  price: string;
  description: string;
  image: string;
  phone?: string;
}) {
  const [open, setOpen] = useState(false);

  // ✅ Cloudinary transformation (preserve resolution, reduce size)
  const transformedImage = image?.includes("/upload/")
    ? image.replace("/upload/", "/upload/q_auto:eco,f_auto,dpr_auto/")
    : "/fallback.jpg"; // fallback in /public folder

  return (
    <>
      {/* Product Card */}
      <div
        className={`${poppins.className} relative mt-3 xxs:w-full md:w-80 border border-gray-700 rounded-lg p-4 flex flex-col items-center h-[350px] shadow-md bg-gray-900 text-white cursor-pointer hover:scale-105 transition-transform duration-300`}
        onClick={() => setOpen(true)}
      >
        {/* ✅ Image Container with fixed aspect ratio */}
        <div className="relative w-[260px] h-[200px] overflow-hidden rounded-lg">
          <Image
            src={transformedImage}
            alt="Product Image"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
        </div>

        <h2 className="mt-3 text-lg font-semibold">{name}</h2>
        <p className="mt-2 text-lg font-bold text-green-400">{price}</p>
        <p className="text-gray-400 text-sm text-center mt-1">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
      </div>

      {/* Glassmorphism Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div
            className={`${poppins.className} relative max-w-4xl w-full mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-8 shadow-2xl min-h-[400px] lg:min-h-[500px]`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 text-xl font-light"
            >
              ✕
            </button>

            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-4xl font-bold text-white px-4">
                {name}
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Image Section */}
              <div className="flex-shrink-0 lg:w-2/5">
                <div className="w-full h-64 lg:h-72 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 relative">
                  <Image
                    src={transformedImage}
                    fill
                    className="object-cover rounded-2xl"
                    alt="Product Image"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4 lg:space-y-6 w-full">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                  <h3 className="text-base lg:text-lg font-medium text-white/70 mb-2">
                    Price
                  </h3>
                  <p className="text-2xl lg:text-3xl font-bold text-green-400">
                    {price}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 lg:p-6">
                  <h3 className="text-base lg:text-lg font-medium text-white/70 mb-3">
                    Description
                  </h3>
                  <p className="text-white/90 leading-relaxed text-sm lg:text-base">
                    {description}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 lg:p-6">
                  <h3 className="text-base lg:text-lg font-medium text-white/70 mb-3">
                    Contact
                  </h3>
                  <p className="text-white/90 text-sm lg:text-base font-medium">
                    {phone || "No phone available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
