import * as React from 'react';
import { cn } from '../../utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'premium';
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, icon, variant = 'default', ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full h-11 rounded-xl px-4 transition-all duration-200',
            'bg-[var(--card)] border-2',
            icon && 'pl-10',
            error ? 'border-[var(--error)] focus:border-[var(--error)] focus:shadow-lg focus:shadow-[var(--error-glow)]' :
            variant === 'premium' ?
            'border-[var(--border)] focus:border-[var(--accent)] focus:shadow-lg focus:shadow-[var(--accent-glow)] focus:bg-gradient-to-r focus:from-[var(--accent-soft)] focus:to-[var(--secondary-soft)]' :
            'border-[var(--border)] focus:border-[var(--accent)] focus:outline-none',
            'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors">
            {icon}
          </div>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-[var(--error)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 16.586 3.313 9.899a1 1 0 00-1.414 1.414l7.071 7.071a1 1 0 001.414 0l8.03-8.03z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
