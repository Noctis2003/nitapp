// this is a client side page for now because it doesnt fetch anything in real time
"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import api from "@/lib/axios"; // Adjust the import path as necessary
import {v4 as uuidv4} from 'uuid'; 
import imageCompression from "browser-image-compression";
// Adjust the import path as necessary
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
  productPrice: z.string().min(1, "Price is required"),
  productImage: z.instanceof(File),
  productPhone: z
  .string()
  .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
  
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
    
     

      const sign=await fetch('/api/cloudinary', {
        method: "POST",
        body: JSON.stringify({
          folder: "your_folder_name",
          public_id: uuidv4()
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { signature, timestamp , apiKey , cloudName , public_id} = await sign.json();
      console.log(signature, timestamp, apiKey, cloudName, public_id);
       const options = {
      maxSizeMB: 0.3, // Max size in MB
      maxWidthOrHeight: 1024, // Optional: resize
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    console.log("Compressed file size:", compressedFile.size / 1024 / 1024, "MB");
    formData.append("file", compressedFile);
    formData.append('api_key', apiKey);
     formData.append('timestamp', timestamp.toString());
     formData.append('signature', signature);
       
     formData.append('public_id', public_id);
       const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }
      
      
      console.log(data.secure_url);
      return {
        imageUrl: data.secure_url,
        public_id
      }
    } catch (error) {
      console.log("Error uploading to Cloudinary:", error);
      throw error;
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      
      
      // Upload image if provided
     
       const res = await uploadToCloudinary(data.productImage);
      const { imageUrl , public_id } = res;

      console.log("Image uploaded successfully:", imageUrl);
      
      // If no image is provided, use a placeholder or handle accordingly
      console.log("public_id", public_id);
      
      // Prepare data for API
      const productData = {
        name: data.productName,
        description: data.productDescription,
        price: data.productPrice,
        image: imageUrl,
        phone: data.productPhone,
        public_id
      };
      
      // Send data to API
     const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/create`,
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

              <input
                {...register("productPhone")}
                type="text"
                className="w-full text-sm mt-3 p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="Enter phone number (10 digits)..."
                maxLength={10}
              />
              {errors.productPhone && <p className="text-red-500 text-sm">{errors.productPhone.message}</p>}

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