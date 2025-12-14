import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const RouteLoader: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[var(--accent-glow)] blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[var(--secondary-glow)] blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        {/* Animated Spinner */}
        <motion.div variants={itemVariants}>
          <div className="relative w-20 h-20">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--accent)] border-r-[var(--secondary)]"
            />
            
            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-3 border-transparent border-b-[var(--accent)] border-l-[var(--secondary)]"
            />
            
            {/* Inner Icon */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-[var(--accent)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="text-lg font-bold text-[var(--text-primary)]">Loading your adventure...</p>
          <p className="text-sm text-[var(--text-secondary)]">Preparing the casino experience</p>
        </motion.div>

        {/* Animated Dots */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-[var(--accent)]"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RouteLoader;

