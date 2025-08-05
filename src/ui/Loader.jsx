import { motion } from 'framer-motion';
import './Loader.css';
import { memo } from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader-cube"
        animate={{
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360],
          rotateZ: [0, 90, 180],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* Gradient faces to match login theme */}
        <motion.div 
          className="cube-face front"
          animate={{
            background: ["#3b82f6", "#8b5cf6", "#3b82f6"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="cube-face back"
          animate={{
            background: ["#8b5cf6", "#3b82f6", "#8b5cf6"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.2
          }}
        />
        <motion.div 
          className="cube-face left"
          animate={{
            background: ["#6366f1", "#a855f7", "#6366f1"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.4
          }}
        />
        <motion.div 
          className="cube-face right"
          animate={{
            background: ["#a855f7", "#6366f1", "#a855f7"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.6
          }}
        />
        <motion.div 
          className="cube-face top"
          animate={{
            background: ["#4f46e5", "#7c3aed", "#4f46e5"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.8
          }}
        />
        <motion.div 
          className="cube-face bottom"
          animate={{
            background: ["#7c3aed", "#4f46e5", "#7c3aed"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1
          }}
        />
        
        {/* Glow effect */}
        <motion.div 
          className="cube-glow"
          animate={{
            boxShadow: [
              "0 0 15px rgba(59, 130, 246, 0.5)",
              "0 0 30px rgba(139, 92, 246, 0.8)",
              "0 0 15px rgba(59, 130, 246, 0.5)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </motion.div>
      
      {/* Loading text with animation */}
      <motion.p
        className="loader-text"
        animate={{
          opacity: [0.6, 1, 0.6],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default memo(Loader);