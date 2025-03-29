"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useForm } from "react-hook-form";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function AskQuestionPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);



  // Handle Image Upload Preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
        alert("Image size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`h-full flex flex-col items-center bg-gray-950 text-gray-300 ${poppins.className} p-5`}>
      <div className="w-full md:w-3/4 text-3xl font-extrabold gap-3 flex flex-col px-4">
        <h1>Ask a Question</h1>
        <span className="text-sm font-light text-gray-400">
          Be specific and clear so that others can help you better!
        </span>
      </div>

      <div className="w-full md:w-3/4 bg-gray-800 p-5 rounded-lg mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Question Title */}
          <div>
            <label className="block text-lg font-semibold mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter a clear and concise title"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Question Description */}
          <div>
            <label className="block text-lg font-semibold mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={5}
              placeholder="Explain your question in detail"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-lg font-semibold mb-1">Tags</label>
            <input
              {...register("tags", { required: "At least one tag is required" })}
              type="text"
              placeholder="e.g., JavaScript, Next.js, MongoDB"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-semibold mb-1">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 cursor-pointer"
              onChange={handleImageUpload}
            />
            <span className="text-gray-400 text-sm">Max size: 5MB | PNG, JPG, JPEG</span>

            {/* Image Preview */}
            {previewImage && (
              <div className="mt-3">
                <Image src={previewImage} alt="Preview" width={192} height={192} className="mt-2 rounded-lg shadow-lg" />
               
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-xl text-lg bg-blue-500 h-[40px] px-3 hover:bg-blue-600 transition"
          >
            Post Question
          </button>
        </form>
      </div>

      {/* Back to Home Link */}
     
    </div>
  );
}

export default AskQuestionPage;
