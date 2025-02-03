import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the desired weights
});

function page() {
  return (
    <div
      className={`h-screen w-screen  flex items-center justify-center  ${poppins.className} `}
    >
      <div className="h-96  border flex  flex-col  shadow-lg w-[390px] items-center backdrop-blur-md  bg-white/20 rounded-lg ">
        <h1 className="mt-11 text-2xl font-bold  h-6 text-center ">
          Hi, Welcome back 👋
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="rounded-lg mt-7 border px-2 py-2  w-2/3"
        />

        <input
          type="Password"
          placeholder="Password"
          className="rounded-lg mt-7 border px-2 py-2 w-2/3 "
        />
      
        <button className="rounded-lg mt-7  px-2 py-2 w-2/3 bg-[#0E64D2] text-white">
          Login
        </button>

       

      </div>
    </div>
  );
}

export default page;
