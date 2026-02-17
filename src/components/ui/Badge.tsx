import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'gold' | 'premium';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  animated?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--card-hover)] text-[var(--text-primary)] border-[var(--border)]',
  success: 'bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]',
  error: 'bg-[var(--error-soft)] text-[var(--error)] border-[var(--error)]',
  warning: 'bg-[var(--warning-soft)] text-[var(--warning)] border-[var(--warning)]',
  info: 'bg-[var(--info-soft)] text-[var(--info)] border-[var(--info)]',
  gold: 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-glow)] text-black border-[var(--gold)]',
  premium: 'bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] text-white border-transparent',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-sm gap-2',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', icon, animated = false, className, children, ...props }, ref) => {
    const badge = (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-semibold rounded-full border whitespace-nowrap',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    );

    if (animated) {
      return (
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex"
        >
          {badge}
        </motion.span>
      );
    }

    return badge;
  }
);

Badge.displayName = 'Badge';

export default Badge;
