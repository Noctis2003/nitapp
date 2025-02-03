import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});

function page() {
  return (
    <div
      className={`h-full w-screen flex items-center justify-center ${poppins.className}`}
    >
      <div className="h-96 mt-9 border flex flex-col shadow-lg w-[390px] items-center relative">
        <h1 className="mt-3 text-2xl font-bold h-6 text-center">
          Create Account
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="rounded-lg mt-7 border px-2 py-2 w-2/3"
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded-lg mt-7 border px-2 py-2 w-2/3"
        />
      
        <input
          type="tel"
          placeholder="OTP"
          className="rounded-lg mt-7 border px-2 py-2 w-2/3"
        />
          
        <button className="rounded-lg mt-7 border px-2 py-2 w-2/3 bg-[#0E64D2] text-white">
          Verify email
        </button>
        <div className="text-red-600 text-sm absolute bottom-0 ">
        only official college Email accepted
        </div>
      </div>
    </div>
  );
}

export default page;
