"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
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

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* Post Button */}
      <span className="font-medium underline text-blue-400 cursor-pointer hover:text-blue-500">
        <button className="underline" onClick={() => setIsOpen(true)}>
          Post here
        </button>
      </span>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-gray-500 w-[90%] md:w-[50%]">
            <h2 className="text-lg font-bold text-white">Create a Post</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-3">
              <input
                {...register("title")}
                className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="Enter title..."
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

              <textarea
                {...register("content")}
                className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-lg focus:outline-none placeholder-gray-400"
                placeholder="What's on your mind?"
                rows={4}
              ></textarea>
              {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-bold"
                >
                  Post
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
