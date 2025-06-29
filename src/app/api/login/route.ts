import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { email} = await request.json();

 

  try {
    const backendRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // only useful in browser-to-server requests, not server-to-server
      }
    );

    const setCookie = backendRes.headers['set-cookie'];

    if (setCookie) {
      const response = NextResponse.json({ message: "Login successful" });

      // Set the cookie(s) manually
      response.headers.set("Set-Cookie", setCookie.join(","));

      return response;
    }

    return NextResponse.json({ error: "No cookie received from backend" }, { status: 500 });

  }catch (error : unknown ) {
      if (axios.isAxiosError(error)) {
        
        console.error("❌ Axios error:", error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || "Submission failed"}`);  
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
      }
      else {
    
        console.error("❌ Error:", error);
        alert("An unexpected error occurred. Please try again later.");
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
      }
    }
}
