import * as React from 'react';
import { cn } from '../../utils/cn';

export type CardVariant = 'solid' | 'glass' | 'gradient' | 'premium';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
  glow?: boolean;
  elevated?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'solid', interactive = false, glow = false, elevated = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-all duration-300',
          // Base styles
          variant === 'glass' && 'glass-effect',
          variant === 'solid' && 'bg-[var(--card)] border-[var(--border)]',
          variant === 'gradient' && 'bg-gradient-to-br from-[var(--card)] to-[var(--card-hover)] border-[var(--border)]',
          variant === 'premium' && 'bg-gradient-to-br from-[rgba(0,212,255,0.08)] via-[var(--card)] to-[rgba(255,107,53,0.08)] border-[var(--border-hover)]',
          // Elevation
          elevated && 'shadow-2xl shadow-black/30',
          // Interactive states
          interactive && 'cursor-pointer hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-black/25 hover:scale-[1.02] hover:translate-y-[-2px]',
          glow && 'relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-[var(--accent-glow)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-bold text-[var(--text-primary)]', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[var(--text-secondary)]', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex items-center', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;

