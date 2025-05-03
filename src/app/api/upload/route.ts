import cloudinary from "@/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const productImage = formData.get("productImage") as File | null;
  const productName = formData.get("productName") as string | null;
  const productDescription = formData.get("productDescription") as string | null;
  const productPrice = formData.get("productPrice") as string | null;
 
  try {
    // Make sure we have an image
    if (!productImage) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    
    // Convert File object to buffer/arraybuffer for Cloudinary
    const bytes = await productImage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a base64 string from the buffer
    const base64Image = buffer.toString('base64');
    const dataURI = `data:${productImage.type};base64,${base64Image}`;
    
    // Upload to Cloudinary using the data URI
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "products", // Optional: organize uploads in folders
      resource_type: "auto" // Automatically detect the file type
    });

    console.log("Upload Response:", uploadResponse);
    
    return NextResponse.json({
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({
      error: "Failed to upload image",
    }, { status: 500 });
  }
}