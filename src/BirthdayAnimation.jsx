
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

// Celebration popup component
const CelebrationPopup = ({ show, onClose }) => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    if (show) {
      // Generate flowers for explosion
      const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️'];
      const newFlowers = [];
      
      for (let i = 0; i < 20; i++) {
        const angle = (360 / 20) * i;
        const distance = 200 + Math.random() * 100;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        
        newFlowers.push({
          id: i,
          emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
          tx,
          ty,
          delay: Math.random() * 0.5
        });
      }
      
      setFlowers(newFlowers);
      
      // Auto close after 4 seconds
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <motion.div
      className="celebration-popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="celebration-content">
        <motion.div
          className="celebration-text"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        >
          🎉 SURPRISE! 🎉
        </motion.div>
        
        <div className="flower-explosion">
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              className="flower"
              style={{
                '--tx': `${flower.tx}px`,
                '--ty': `${flower.ty}px`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: flower.delay }}
            >
              {flower.emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Bottom candles component
const BottomCandles = () => {
  return (
    <div className="bottom-candles">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="bottom-candle"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
        />
      ))}
    </div>
  );
};

// Countdown timer component
const CountdownTimer = () => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      let birthday = new Date(currentYear, 8, 5); // September is month 8 (0-indexed)
      
      // If birthday has passed this year, calculate for next year
      if (today > birthday) {
        birthday = new Date(currentYear + 1, 8, 5);
      }
      
      const timeDiff = birthday - today;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    calculateDaysLeft();
    // Update every hour to keep it accurate
    const interval = setInterval(calculateDaysLeft, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="countdown-timer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="countdown-number">{daysLeft}</div>
      <div className="countdown-text">
        {daysLeft === 1 ? 'Day Left' : 'Days Left'}
      </div>
    </motion.div>
  );
};

export default function BirthdayAnimation() {
  const [showContent, setShowContent] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

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
    { id: 6, element: "💖", top: "10%", left: "85%", duration: 4, delay: 1 },
    { id: 7, element: "✨", top: "80%", left: "15%", duration: 5, delay: 2 },
  ];

  return (
    <div className="birthday-screen">
      {/* Celebration Popup */}
      <AnimatePresence>
        <CelebrationPopup 
          show={showCelebration} 
          onClose={() => setShowCelebration(false)} 
        />
      </AnimatePresence>

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

      {/* Bottom Candles */}
      <BottomCandles />

      <div className="content-container">
        {showContent && (
          <>
            {/* Countdown Timer */}
            <CountdownTimer />

            {/* Simran's Photo */}
            <motion.div
              className="photo-container"
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <img 
                src="/simran.jpg" 
                alt="Simran" 
                className="birthday-photo"
              />
            </motion.div>

            {/* Birthday Cake */}
            <motion.div
              className="cake-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <div className="cake">
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="candle"></div>
                <div className="cake-base"></div>
              </div>
            </motion.div>

            {/* Subtitle with Simran's name */}
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              Dearest Simran, I celebrate the day you were born.
            </motion.p>

            {/* Main Title */}
            <div className="title-container">
              <AnimatedText text="HAPPY" className="title-line" delay={3} />
              <AnimatedText text="BIRTHDAY" className="title-line" delay={3.5} />
            </div>

            {/* Bottom message */}
            <motion.p
              className="bottom-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5, duration: 0.8 }}
            >
              Let's have fun, have some cake, and have a few drinks!
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
}
