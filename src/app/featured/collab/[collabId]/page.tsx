"use client";
import { useState, useEffect } from "react";
import axios from '@/lib/axios';
import { use } from 'react';
import {Poppins} from "next/font/google";

  const poppins = Poppins({ subsets: ["latin"], weight: "400" });

function Page({ params }: { params: { collabId: string } }) {

  const [collab, setCollab] = useState<Collab | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
     const {collabId} = use(params);
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

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        Error: {error} (ID: {collabId})
      </div>
    );

  if (!collab) return <div>No collaboration found</div>;

  return (
    <div className={`max-w-5xl mx-auto px-4 py-8 ${poppins.className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{collab.name}</h1>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-300 mb-8">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p>{collab.description}</p>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4">Roles & Skills Needed</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {collab.roles?.map((role, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-white mb-2">{role.roleName}</h3>
            <p className="text-gray-300 mb-4">{role.description}</p>
            <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
