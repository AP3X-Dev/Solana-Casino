import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface DividerProps {
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  color?: 'default' | 'accent' | 'secondary';
  spacing?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const spacingClasses = {
  sm: 'my-4',
  md: 'my-6',
  lg: 'my-8',
};

const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  color = 'default',
  spacing = 'md',
  animated = false,
}) => {
  const variantClasses = {
    solid: `border-${color === 'default' ? '[var(--border)]' : color === 'accent' ? '[var(--accent)]' : '[var(--secondary)]'}`,
    dashed: `border-dashed border-${color === 'default' ? '[var(--border)]' : color === 'accent' ? '[var(--accent)]' : '[var(--secondary)]'}`,
    dotted: `border-dotted border-${color === 'default' ? '[var(--border)]' : color === 'accent' ? '[var(--accent)]' : '[var(--secondary)]'}`,
    gradient: '',
  };

  if (variant === 'gradient') {
    return (
      <motion.div
        animate={animated ? { opacity: [0.3, 0.8, 0.3] } : false}
        transition={{ duration: 3, repeat: Infinity }}
        className={cn('h-px w-full', spacingClasses[spacing])}
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)',
        }}
      />
    );
  }

  return (
    <motion.hr
      animate={animated ? { opacity: [0.5, 1, 0.5] } : false}
      transition={{ duration: 2, repeat: Infinity }}
      className={cn(
        'border-0 border-t',
        spacingClasses[spacing],
        color === 'accent' && 'border-[var(--accent)]',
        color === 'secondary' && 'border-[var(--secondary)]',
        color === 'default' && 'border-[var(--border)]',
        variant === 'dashed' && 'border-dashed',
        variant === 'dotted' && 'border-dotted'
      )}
    />
  );
};

export default Divider;
