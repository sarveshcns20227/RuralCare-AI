import { HeartPulse } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-lg">

      <div className="flex items-center gap-2">
        <HeartPulse className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-blue-700">
          RuralCare AI
        </h1>
      </div>

      <div className="flex gap-6">
        <button className="hover:text-blue-600">Home</button>
        <button className="hover:text-blue-600">Dashboard</button>
        <button className="hover:text-blue-600">Consult</button>
      </div>
    </nav>
  );
}