
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BirthdayAnimation.css";

// Floating decorative elements
const FloatingElement = ({ children, initialTop, initialLeft, duration, delay }) => {
  return (
    <motion.div
      className="floating-element"
      style={{ top: initialTop, left: initialLeft }}
      initial={{ y: 0, opacity: 0.6 }}
      animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// Animated text component
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = Array.from(text);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", damping: 12, stiffness: 200 }
    },
  };
  
  return (
    <motion.div
      className={className}
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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Decorative elements scattered around
  const decorativeElements = [
    { id: 1, element: "〰️", top: "15%", left: "10%", duration: 4, delay: 0 },
    { id: 2, element: "〰️", top: "70%", left: "85%", duration: 5, delay: 1 },
    { id: 3, element: "○", top: "20%", left: "15%", duration: 6, delay: 2 },
    { id: 4, element: "◐", top: "25%", left: "80%", duration: 4.5, delay: 0.5 },
    { id: 5, element: "◑", top: "75%", left: "20%", duration: 5.5, delay: 1.5 },
  ];

  return (
    <div className="birthday-screen">
      {/* Floating decorative elements */}
      {decorativeElements.map((el) => (
        <FloatingElement 
          key={el.id} 
          initialTop={el.top} 
          initialLeft={el.left}
          duration={el.duration}
          delay={el.delay}
        >
          {el.element}
        </FloatingElement>
      ))}

      <div className="content-container">
        {showContent && (
          <>
            {/* Birthday Cake */}
            <motion.div
              className="cake-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <div className="cake">
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="cake-base"></div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Dearest, I celebrate the day you were born.
            </motion.p>

            {/* Main Title */}
            <div className="title-container">
              <AnimatedText text="HAPPY" className="title-line" delay={2} />
              <AnimatedText text="BIRTHDAY" className="title-line" delay={2.5} />
            </div>

            {/* Bottom message */}
            <motion.p
              className="bottom-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4, duration: 0.8 }}
            >
              Let's have fun, have some cake, and have a few drinks!
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
}
