import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BirthdayAnimation.css"; // Import the CSS file

// Helper component for floating elements
const FloatingElement = ({ children, initialTop, initialLeft, duration, delay }) => {
  return (
    <motion.div
      className="absolute text-3xl md:text-4xl"
      style={{ top: initialTop, left: initialLeft, pointerEvents: 'none' }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: [0, -20, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// Helper component for animated text
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = Array.from(text);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: i * delay },
    }),
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20, x: -10 },
    visible: { opacity: 1, y: 0, x: 0, transition: { type: "spring", damping: 12, stiffness: 200 }},
  };
  return (
    // KEY CHANGE: Added "animated-text-container" to handle wrapping and centering
    <motion.div
      className={`animated-text-container ${className}`} 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function BirthdayAnimation() {
  const [isOpened, setIsOpened] = useState(false);
  const [showCardContent, setShowCardContent] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  // --- CONFIGURATION ---
  const birthdayDate = new Date("2025-09-04T00:00:00"); // SET THE BIRTHDAY DATE HERE!

  useEffect(() => {
    const today = new Date();
    const timeDiff = birthdayDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysLeft(days > 0 ? days : 0);
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => setShowCardContent(true), 800);
  };

  const backgroundElements = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    emoji: ["💖", "🌸", "✨", "🌷", "💕", "🌺"][i % 6],
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    initialTop: `${Math.random() * 100}%`,
    initialLeft: `${Math.random() * 100}%`,
  }));

  return (
    <div className="birthday-container">
      <div className="pulse-bg"></div>
      {backgroundElements.map((el) => (<FloatingElement key={el.id} {...el}>{el.emoji}</FloatingElement>))}
      <audio src="path/to/your/romantic/song.mp3" autoPlay loop />

      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="envelope"
            className="envelope"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            onClick={handleOpen}
          >
            <div className="envelope-flap"></div>
            <motion.div className="envelope-icon" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>💌</motion.div>
            <p className="envelope-text">Click Me, My Love</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpened && (
        <motion.div
          key="card"
          className="birthday-card"
          initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100, damping: 15 }}
        >
          {showCardContent && (
            <>
              <motion.div className="card-photo-wrapper" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8, type: "spring" }}>
                <img src="https://via.placeholder.com/200" alt="A special moment" className="card-photo" />
              </motion.div>

              <AnimatedText text="Happy Birthday," className="card-h1" delay={0.5} />
              <AnimatedText text="My Dearest Simran 💖" className="card-h2-gradient" delay={1.5} />

              <motion.p className="card-paragraph" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3, duration: 1 }}>
                Every day with you is a gift, and today we celebrate the most precious gift of all – you.
              </motion.p>
              
              <motion.div className="card-countdown" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.8, duration: 0.8, type: "spring" }}>
                <p className="card-countdown-text">Just {daysLeft} Days Until We Celebrate!</p>
                <p className="card-countdown-icon">📅</p>
              </motion.div>

              <motion.p className="card-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1 }}>
                Forever and always yours.
              </motion.p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}