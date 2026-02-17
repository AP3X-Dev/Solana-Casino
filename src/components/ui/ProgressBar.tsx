import * as React from 'react';
import { cn } from '../../utils/cn';

export type ProgressColor = 'accent' | 'success' | 'error' | 'warning' | 'gold';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: ProgressColor;
  striped?: boolean;
  animated?: boolean;
  showLabel?: boolean;
}

const colorClasses: Record<ProgressColor, string> = {
  accent: 'bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]',
  success: 'bg-gradient-to-r from-[var(--success)] to-[#00cc70]',
  error: 'bg-gradient-to-r from-[var(--error)] to-[#e63946]',
  warning: 'bg-gradient-to-r from-[var(--warning)] to-[#e69500]',
  gold: 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-glow)]',
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, max = 100, color = 'accent', striped = false, animated = false, showLabel = false, className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div className="h-3 rounded-full bg-[var(--card-hover)] overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              colorClasses[color],
              striped && 'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]',
              animated && striped && 'animate-[progress-stripe_1s_linear_infinite]'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="text-xs font-semibold text-[var(--text-secondary)] mt-1 text-right">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
