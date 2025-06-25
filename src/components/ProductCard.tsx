import Image from "next/image";
import { Poppins } from "next/font/google";
import { Link } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function ProductCard({name, price, description , image}: {name: string, price: string, description: string, image: string}) {
 const transformedImage = image.replace('/upload/', '/upload/w_250,h_180,c_fill,q_auto:best/');
  return (
    
    <div
      className={`${poppins.className} relative mt-3 xxs:w-full md:w-80 border border-gray-700 rounded-lg p-4 flex flex-col items-center h-[350px] shadow-md bg-gray-900 text-white`}
    >
      
      <Image
        src={transformedImage}
        height={180}
        width={260}
        className="rounded-lg object-cover"
        alt="Product Image"
      />
      <h2 className="mt-3 text-lg font-semibold">{name}</h2>
      <p className="mt-2 text-lg font-bold text-green-400  ">{price}</p>
      <p className="text-gray-400 text-sm text-center mt-1 ">
     {description.length > 100 ? description.slice(0, 100) + '...' : description}
      </p>
      
     
    </div>
  );
}
