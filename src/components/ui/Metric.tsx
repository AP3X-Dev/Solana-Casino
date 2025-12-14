import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface MetricProps {
  value: string | number;
  label: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  unit?: string;
  icon?: React.ReactNode;
  color?: 'accent' | 'success' | 'error' | 'warning' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const colorClasses = {
  accent: 'text-[var(--accent)]',
  success: 'text-[var(--success)]',
  error: 'text-[var(--error)]',
  warning: 'text-[var(--warning)]',
  gold: 'text-[var(--gold)]',
};

const sizeClasses = {
  sm: {
    text: 'text-2xl',
    label: 'text-xs',
  },
  md: {
    text: 'text-4xl',
    label: 'text-sm',
  },
  lg: {
    text: 'text-6xl',
    label: 'text-base',
  },
};

const Metric: React.FC<MetricProps> = ({
  value,
  label,
  change,
  trend = 'neutral',
  unit,
  icon,
  color = 'accent',
  size = 'md',
  animate = true,
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        {icon && (
          <motion.div
            animate={animate ? { rotate: [0, 360] } : false}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className={colorClasses[color]}
          >
            {icon}
          </motion.div>
        )}
        <span className={cn('font-medium text-[var(--text-secondary)]', sizeClasses[size].label)}>
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <motion.div
          initial={animate ? { opacity: 0, scale: 0.5 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : false}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={cn(
            'font-black tabular-nums',
            colorClasses[color],
            sizeClasses[size].text
          )}
        >
          {value}
        </motion.div>
        {unit && (
          <span className={cn('text-[var(--text-secondary)]', sizeClasses[size].label)}>
            {unit}
          </span>
        )}
      </div>

      {change && (
        <motion.div
          initial={animate ? { opacity: 0, x: -10 } : false}
          animate={animate ? { opacity: 1, x: 0 } : false}
          transition={{ delay: 0.2 }}
          className={cn(
            'text-sm font-semibold',
            trend === 'up' && 'text-[var(--success)]',
            trend === 'down' && 'text-[var(--error)]',
            trend === 'neutral' && 'text-[var(--text-secondary)]'
          )}
        >
          {trend === 'up' && '↑'} {trend === 'down' && '↓'} {change}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Metric;
