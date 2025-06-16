"use client";
import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import { use } from 'react';
import { Poppins } from "next/font/google";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set } from "date-fns";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

function Page({ params }: { params: { collabId: string } }) {
  const [collab, setCollab] = useState<Collab | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredRole, setHoveredRole] = useState<number | null>(null);
  const { collabId } = use(params);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [roleId, setRoleId] = useState<Number | null>(null);

const applicationSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

type Formdata=z.infer<typeof applicationSchema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<Formdata>({
  resolver: zodResolver(applicationSchema),
}
);


const onsubmit = async (data: Formdata) => {

console.log(data);
console.log(roleId);


}


  useEffect(() => {
    const fetchCollab = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/collab/collabs/?id=${collabId}`,
          { withCredentials: true }
        );
        setCollab(response.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCollab();
  }, [collabId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center relative">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-pink-400 border-b-transparent rounded-full animate-spin animate-reverse"></div>
          <div className={`mt-4 text-cyan-400 text-center ${poppins.className} font-bold tracking-wider`}>
            LOADING...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 max-w-md">
          <div className="text-red-400 text-center">
            <div className={`text-2xl font-bold mb-2 ${poppins.className}`}>ERROR</div>
            <div className={poppins.className}>
              {error} (ID: {collabId})
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!collab) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-gray-500/10 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-8">
          <div className={`text-gray-400 text-center ${orbitron.className} font-bold`}>
            NO COLLABORATION FOUND
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className={`text-6xl md:text-6xl font-black mb-6 ${poppins.className} bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent animate-pulse`}>
            {collab.name}
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        {/* Description Card */}
        <div className="mb-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <h2 className={`text-2xl font-bold text-cyan-400 ${poppins.className} tracking-wider`}>
                MISSION BRIEFING
              </h2>
            </div>
            <p className={`text-gray-300 text-lg leading-relaxed ${poppins.className} font-light`}>
              {collab.description}
            </p>
          </div>
        </div>

        {/* Roles Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-12">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-cyan-400 rounded-full"></div>
            <h2 className={`text-4xl font-bold text-white mx-6 ${poppins.className} tracking-wider`}>
              ROLES AVAILABLE
            </h2>
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-cyan-400 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {collab.roles?.map((role, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredRole(index)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                {/* Animated Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  {/* Role Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                      hoveredRole === index ? 'bg-cyan-300 animate-pulse' : 'bg-cyan-400'
                    }`}></div>
                    <h3 className={`text-2xl font-bold text-white ${poppins.className} tracking-wide`}>
                      {role.roleName}
                    </h3>
                  </div>

                  {/* Role Description */}
                  <p className={`text-gray-300 mb-8 leading-relaxed ${poppins.className} font-light`}>
                    {role.description}
                  </p>

                  {/* Apply Button */}
                  <div className="relative overflow-hidden">
                    <button onClick={() => {setOpen(true),setRoleId(role.id)}} className="w-full bg-gradient-to-r from-cyan-500 via-cyan-500 to-cyan-600 text-white py-4 px-8 rounded-xl font-bold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden group">
                      <span className={`relative z-10 ${poppins.className}`}>APPLY NOW</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  {/* Hover Effect Particles */}
                  {hoveredRole === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-4 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-300 rounded-full animate-ping delay-300"></div>
                      <div className="absolute top-1/2 right-8 w-1 h-1 bg-cyan-500 rounded-full animate-ping delay-500"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Glow Effect */}
        <div className="text-center mt-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>
      </div>

        {open && (
  <div className={`${poppins.className} font-medium fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md z-50`}>
    <div className="bg-gray-900/80 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-lg relative">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center">Apply for Role</h3>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <textarea
          {...register("message")}
          placeholder="Why do you think you are the best fit?"
          className="w-full h-32 resize-none p-4 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}

        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-2 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitted}
            className="flex-1 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {submitted ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}

export default Page;