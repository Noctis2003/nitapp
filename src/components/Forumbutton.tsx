"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

function Forumbutton() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setErrorMsg("");
      
      const res = await axios.post("http://localhost:4000/forum/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // important for HttpOnly cookies
      });
      console.log("Post created:", res.data);
      reset();
      setIsOpen(false);
    } catch (error) {
      setErrorMsg("Something went wrong while posting. Try again!");
      console.error("Post error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <span className="font-medium underline text-blue-400 cursor-pointer hover:text-blue-500">
        <button className="underline" onClick={() => setIsOpen(true)}>
          Post here
        </button>
      </span>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md z-50">
          <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-none shadow-lg border border-gray-500 w-full h-full flex flex-col justify-center items-center"> {/* Full page styles */}
            <h2 className="text-5xl font-bold text-white mb-6">Create a Post</h2> {/* Adjusted heading size */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-3/4 max-w-3xl">
              <input
                {...register("title")}
                className="w-full text-2xl p-4 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="Enter title..."
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

              <textarea
                {...register("description")}
                className="w-full text-2xl p-4 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="What's on your mind?"
                rows={6}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

              {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 font-bold"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-bold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Forumbutton;
