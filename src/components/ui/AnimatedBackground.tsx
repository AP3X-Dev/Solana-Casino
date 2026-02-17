import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'intense';
}

const configs = {
  default: { opacity1: [0.12, 0.22, 0.12], opacity2: [0.08, 0.18, 0.08], opacity3: [0.05, 0.12, 0.05] },
  subtle: { opacity1: [0.06, 0.12, 0.06], opacity2: [0.04, 0.1, 0.04], opacity3: [0.03, 0.08, 0.03] },
  intense: { opacity1: [0.18, 0.3, 0.18], opacity2: [0.12, 0.25, 0.12], opacity3: [0.08, 0.18, 0.08] },
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const c = configs[variant];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <motion.div
        animate={{ y: [0, -30, 0], opacity: c.opacity1 }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-[var(--accent-glow)] to-[var(--secondary-glow)] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: c.opacity2 }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--secondary-glow)] blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: c.opacity3 }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold-glow)] blur-3xl"
      />
    </div>
  );
};

export default AnimatedBackground;
