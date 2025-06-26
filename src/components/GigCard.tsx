import { Mail } from "lucide-react";

export default function GigCard({ email, codename, description }:{ email: string, codename: string, description: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/40 rounded-2xl p-6 shadow-[0_0_30px_#22d3ee22] hover:shadow-[0_0_40px_#22d3ee66] transition duration-300 space-y-4">
      <div className="text-sm text-cyan-300 flex items-center gap-2">
        <Mail className="w-4 h-4" />
        {email}
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight">
        {codename}
      </h2>

      <p className="text-gray-400 text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
