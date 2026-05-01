import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6"
    >
      <h1 className="text-6xl font-bold mb-6">
        Smart Healthcare for Rural Communities
      </h1>

      <p className="max-w-2xl text-lg text-blue-100">
        Low-bandwidth telehealth and diabetes monitoring system
        connecting patients with doctors in real time.
      </p>

      <button className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition">
        Start Consultation
      </button>
    </motion.section>
  );
}