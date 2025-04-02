"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Define Zod schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().min(1, "At least one tag is required"),
  image: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

function AskQuestionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Handle Image Upload Preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Submission
  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    reset();
    setPreviewImage(null);
  };

  return (
    <div className={`xxs:mt-11 md:mt-2 h-full flex flex-col items-center bg-gray-950 text-gray-300 ${poppins.className} p-5`}>
      <div className="w-full md:w-3/4 text-3xl font-extrabold gap-3 flex flex-col px-4">
        <h1>Ask a Question</h1>
        <span className="text-sm font-light text-gray-400">Be specific and clear so that others can help you better!</span>
      </div>

      <div className="w-full md:w-3/4 bg-gray-800 p-5 rounded-lg mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Title</label>
            <input {...register("title")} placeholder="Enter a clear and concise title" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Description</label>
            <textarea {...register("description")} rows={5} placeholder="Explain your question in detail" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Tags</label>
            <input {...register("tags")} placeholder="e.g., JavaScript, Next.js, MongoDB" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400" />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Upload Image (Optional)</label>
            <input type="file" accept="image/png, image/jpeg, image/jpg" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 cursor-pointer" onChange={handleImageUpload} />
            <span className="text-gray-400 text-sm">Max size: 5MB | PNG, JPG, JPEG</span>
            {previewImage && (
              <div className="mt-3">
                <Image src={previewImage} alt="Preview" width={192} height={192} className="mt-2 rounded-lg shadow-lg" />
              </div>
            )}
          </div>

          <button type="submit" className="rounded-xl text-lg bg-blue-500 h-[40px] px-3 hover:bg-blue-600 transition">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestionPage;
