"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-gray-900 text-center mb-4"
      >
        국내외 금리, 유동성, 환율 기반
        <br />
        <span className="text-blue-600">경기 사이클 포착 플랫폼</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-600 text-center max-w-xl mb-8"
      >
        시장의 사이클을 이해하고, 타이밍을 잡아가는 주식 투자자를 위한 실시간 분석 도구를 제공합니다.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
        onClick={() => window.location.href = "/dashboard"}
      >
        경기 사이클 확인하기 →
      </motion.button>
    </main>
  );
}
