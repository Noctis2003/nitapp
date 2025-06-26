// this is a client side page for now because it doesnt fetch anything in real time
"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import axios from 'axios'; // Adjust the import path as necessary

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Description is required"),
  productPrice: z.string().min(1, "Price is required"),
  productImage: z.instanceof(File),
});

type FormData = z.infer<typeof formSchema>;

function Sellbutton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function uploadToCloudinary(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "noctis_unsigned"); 
      
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      
      const data = await res.json();
      console.log(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      let imageUrl = "";
      
      // Upload image if provided
      if (data.productImage) {
        imageUrl = await uploadToCloudinary(data.productImage);
      }
      
      // Prepare data for API
      const productData = {
        name: data.productName,
        description: data.productDescription,
        price: data.productPrice,
        image: imageUrl
      };
      
      // Send data to API
     const response = await axios.post(
        "http://localhost:4000/shop/create",
        productData,
        { withCredentials: true } // Include credentials for authentication
      );
      console.log("Product added successfully:", response.data);
      // If successful, close modal and reset form
      reset();
      setIsOpen(false);
      
      // You might want to add some success notification here
      
    } catch (error) {
      console.error("Error submitting product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        <div className={`${poppins.className} font-medium fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md z-50`}>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-500 w-full max-w-md md:w-2/3 lg:w-1/2">
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

              <div className="w-full">
                <label className="block text-sm text-gray-300 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setValue("productImage", e.target.files[0]);
                    }
                  }}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-base text-white rounded-lg hover:bg-gray-500 font-bold"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                    setError(null);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-500 font-bold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
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