import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactElement;
  className?: string;
}

const sideStyles: Record<string, { initial: object; position: string }> = {
  top: {
    initial: { opacity: 0, y: 6 },
    position: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  },
  bottom: {
    initial: { opacity: 0, y: -6 },
    position: 'top-full left-1/2 -translate-x-1/2 mt-2',
  },
  left: {
    initial: { opacity: 0, x: 6 },
    position: 'right-full top-1/2 -translate-y-1/2 mr-2',
  },
  right: {
    initial: { opacity: 0, x: -6 },
    position: 'left-full top-1/2 -translate-y-1/2 ml-2',
  },
};

const Tooltip: React.FC<TooltipProps> = ({ content, side = 'top', delay = 300, children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(true), delay);
  };

  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const { initial, position } = sideStyles[side];

  return (
    <div className="relative inline-flex" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={initial}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-3 py-2 rounded-lg',
              'bg-[var(--card)] border border-[var(--border)] shadow-xl',
              'text-sm text-[var(--text-primary)] whitespace-nowrap',
              position,
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
