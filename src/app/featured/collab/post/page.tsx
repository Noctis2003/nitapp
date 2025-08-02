"use client";

import { Sparkles, Terminal, Users, X } from "lucide-react";
import { Poppins } from "next/font/google";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(50, "The description must be at least 50 characters"),
  roles: z
    .array(z.string().max(50, "Role must be 50 characters or less"))
    .min(1, "At least one role is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function EpicIdeaForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      roles: [""],
    },
  });

  
  const router = useRouter();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles" as never,
  });

  const onSubmit = async (data: FormData) => {
    console.log("🚀 Form submitted:", data);

    try {
      const domain = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/email`, {
        withCredentials: true,
      });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/collab/create`,
        {
          name: data.name,
          description: data.description,
          roles: data.roles.map((role) => ({ roleName: role })),
          domain: domain,
        },
        {
          withCredentials: true, // send cookies (if HttpOnly auth is used)
        }
      );

      console.log("✅ Submitted successfully:", response.data);
      router.push("/featured/collab"); // Redirect to the gigs page
      // Optionally, you could show a toast or redirect the user
    } catch (error : unknown ) {
      if (axios.isAxiosError(error)) {
        
        console.error("❌ Axios error:", error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || "Submission failed"}`);  
      }
      else {
    
        console.error("❌ Error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className={`mt-0 text-white flex flex-grow items-center justify-center  py-6 w-full ${poppins.className}`}
    >
      <div className="w-full max-md:mt-10 max-w-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 p-8 rounded-3xl shadow-[0_0_30px_#22d3ee33]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center tracking-tight mb-6 flex items-center justify-center gap-3">
          <Sparkles className="animate-bounce" />
          Submit a Mission Worth Building
        </h1>

        <p className="text-gray-400 text-center mb-6 max-w-xl mx-auto text-base">
          Share your epic idea and assemble a team to bring it to life. Describe
          your vision.
         
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block text-cyan-300 font-semibold mb-1">
              <Terminal className="inline-block w-5 h-5 mr-2" />
              Codename (Short Idea)
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="e.g. 'Hyperlink for Humanity'"
              className="w-full p-3 bg-gray-900 border border-cyan-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder:text-cyan-300/40 transition duration-200"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-cyan-300 font-semibold mb-1">
              📜 The Blueprint
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe your idea in detail. Describe roles and their responsibilites"
              className="w-full p-3 bg-gray-900 border border-cyan-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder:text-cyan-300/40 transition duration-200"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Roles */}
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">
              <Users className="inline-block w-5 h-5 mr-2" />
              Assemble Your Crew
            </label>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <div className="flex-1">
                    <div>
                    <input
                      {...register(`roles.${index}`)}
                      type="text"
                      placeholder="Describe the role in detail"
                      className="w-full p-3 bg-gray-900 border border-cyan-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder:text-cyan-300/40 transition duration-200"
                    />
                    </div>
                    {errors.roles && errors.roles[index] && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.roles[index]?.message}
                      </p>
                    )}
                  </div>

                  {/* Remove button */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-cyan-400 hover:text-red-500 transition mt-3"
                      title="Remove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {/* Array-level error */}
              {errors.roles && !Array.isArray(errors.roles) && (
                <p className="text-red-400 text-sm">{errors.roles.message}</p>
              )}

              <button
                type="button"
                onClick={() => append("")}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium underline mt-1"
              >
                ➕ Add a Role
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition duration-300"
          >
            🚀 Deploy This Idea to the Grid
          </button>
        </form>
      </div>
    </div>
  );
}
