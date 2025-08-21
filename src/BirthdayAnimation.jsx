import React, { useState } from "react";
import { motion } from "framer-motion";

export default function BirthdayAnimation() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-200 relative overflow-hidden">
      {/* Flowers background */}
      <div className="absolute top-5 left-10 text-4xl">🌸</div>
      <div className="absolute top-20 right-16 text-5xl">🌺</div>
      <div className="absolute bottom-10 left-20 text-4xl">🌷</div>
      <div className="absolute bottom-16 right-10 text-5xl">🌼</div>

      {!opened ? (
        // Envelope before opening
        <motion.div
          className="w-48 h-32 bg-pink-500 relative cursor-pointer shadow-2xl rounded flex items-center justify-center"
          onClick={() => setOpened(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Envelope flap */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[96px] border-r-[96px] border-b-[72px] border-l-transparent border-r-transparent border-b-pink-400"></div>
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold z-10">Tap to Open</p>
        </motion.div>
      ) : (
        // Birthday card after opening
        <motion.div
          initial={{ scale: 0, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white w-96 h-80 shadow-2xl rounded-2xl border-4 border-pink-400 flex flex-col items-center justify-center text-center p-6 relative"
        >
          <motion.h1
            className="text-3xl font-bold text-pink-600"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            🎉 Happy Birthday 🎉
          </motion.h1>
          <motion.h2
            className="text-2xl font-semibold text-pink-700 mt-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Simran Babbyy 💖
          </motion.h2>

          {/* Animated Calendar */}
          <motion.div
            className="mt-8 bg-pink-100 border-2 border-pink-400 rounded-lg p-4 w-48 shadow-md"
            initial={{ y: 30, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
          >
            <p className="text-xl font-bold text-pink-600">📅 14 Days Left</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
