"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Description is required"),
  productPrice: z.string().min(1, "Price is required"),
  productImage: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

function Sellbutton() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 py-1 px-4 text-xl font-bold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => setIsOpen(true)}
      >
        Sell
      </button>

      {isOpen && (
        <div className={`${poppins.className} font-medium fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md`}>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-500 w-[90%] md:w-[50%]">
            <h2 className="text-lg font-bold text-white">Add a Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <input
                {...register("productName")}
                type="text"
                className="w-full text-sm mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="Enter product name..."
              />
              {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}

              <textarea
                {...register("productDescription")}
                className="w-full mt-3 text-sm p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="Enter product description..."
                rows={3}
              ></textarea>
              {errors.productDescription && <p className="text-red-500 text-sm">{errors.productDescription.message}</p>}

              <input
                {...register("productPrice")}
                type="number"
                className="w-full text-sm mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="Enter price..."
              />
              {errors.productPrice && <p className="text-red-500 text-sm">{errors.productPrice.message}</p>}

              <input
                type="file"
                accept="image/*"
                className="w-full text-sm mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setValue("productImage", e.target.files[0]);
                  }
                }}
              />

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-base text-white rounded-lg hover:bg-gray-500 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-500 font-bold"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Sellbutton;
