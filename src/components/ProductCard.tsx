import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function ProductCard() {
  return (
    <div
      className={`${poppins.className} mt-3 w-80 border border-gray-700 rounded-lg p-4 flex flex-col items-center h-96 shadow-md bg-gray-900 text-white`}
    >
      <Image
        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        height={180}
        width={260}
        className="rounded-lg object-cover"
        alt="Product Image"
      />
      <h2 className="mt-3 text-lg font-semibold">Xae4x Calculator</h2>
      <p className="text-gray-400 text-sm text-center mt-1">
        Barely used calculator with a slight screen crack. Fully functional.
      </p>
      <p className="mt-2 text-lg font-bold text-green-400">₹1,200</p>
      <button
        className="mt-3 font-bold bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 
        rounded-lg hover:from-green-600 hover:to-green-800 shadow-md hover:shadow-lg transition-all"
      >
        Buy Now
      </button>
    </div>
  );
}
