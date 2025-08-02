// Example in a Next.js API route: /api/delete-image.ts
// this is how its done
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const { public_id } = await req.json();

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
