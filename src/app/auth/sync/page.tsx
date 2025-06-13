"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from '@/lib/axios';
import { Poppins } from "next/font/google";
import { cookies } from "next/headers"; 
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
        const existingUser = await axios.get('http://localhost:4000/auth/exists', {
          params: { email },
        });

        if (existingUser.data) {
          const response = await axios.post(
            'http://localhost:4000/auth/login',
            { email },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("Login response:", response.data);
        } else {
          await axios.post(
            'http://localhost:4000/auth/register',
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
      router.push('/auth/login');
    }
  }, [status, session, router]);

  return (
    <div className={`flex items-center justify-center h-screen bg-gray-950 ${poppins.className}`}>
      <h1 className="text-5xl font-bold text-white">
        Noctis welcomes you
        </h1>
    </div>
  );
}
