import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const validationErrors = {
  email: "Invalid email format",
  password: "Password must be at least 8 characters",
};

function Page() {
  return (
    <div className={`relative h-screen w-screen flex items-center justify-center bg-gray-900 ${poppins.className}`}>
      <div className="h-96 border flex flex-col shadow-lg w-[390px] items-center backdrop-blur-lg bg-gray-800/30 rounded-lg">
        <h1 className="mt-11 text-2xl font-bold text-center text-white">
          Sign up
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="rounded-lg mt-7 border px-3 py-2 w-2/3 text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
        <input
          type="password"
          placeholder="Password"
          className="rounded-lg mt-4 border px-3 py-2 w-2/3 text-white bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-400 text-sm mt-1">{validationErrors.password}</p>
        <button className="rounded-lg mt-7 px-3 py-2 w-2/3 bg-[#0E64D2] text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Verify
        </button>
        <h1 className="absolute bottom-0 text-red-400">
          Only official college id accepted
        </h1>
      </div>
    </div>
  );
}

export default Page;
