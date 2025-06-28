"use client";
// here the useSession hook is used to get the session data
// and the actual loggin and registration is handled by the backend in here

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function SyncPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const syncWithBackend = async () => {
      if (!session?.user?.email) return;
   
      const email = session.user.email.toLowerCase();

      try {
        const existingUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/exists`, {
          params: { email },
        });

        if (existingUser.data) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { email },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("Login response:", response.data);

          // Set cookies manually if needed
          

        } else {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
              email: session.user.email,
              username: session.user.name,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        router.push('/featured/collab');
      } catch (err) {
        console.error("Error syncing with backend:", err);
      }
    };

    if (status === 'authenticated') {
      syncWithBackend();
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, session, router]);

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-950 px-4 py-8 ${poppins.className}`}>
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
          Noctis welcomes you
        </h1>
        {/* Optional: Add a subtle loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white opacity-50"></div>
        </div>
      </div>
    </div>
  );
}