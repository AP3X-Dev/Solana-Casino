import * as React from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--accent-glow)] hover:shadow-xl hover:shadow-[var(--accent-glow)] hover:brightness-110 active:brightness-95 transition-all duration-200',
  secondary:
    'bg-[var(--card)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--card-hover)] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 active:scale-95',
  outline:
    'bg-transparent text-[var(--text-primary)] border-2 border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all duration-200 active:scale-95',
  ghost:
    'bg-transparent text-[var(--text-primary)] hover:bg-[var(--card-hover)] transition-all duration-200 active:scale-95',
  danger:
    'bg-[var(--error-soft)] text-[var(--error)] border border-[var(--error)] hover:bg-[var(--error)] hover:text-white hover:shadow-lg hover:shadow-[var(--error-glow)] transition-all duration-200 active:scale-95',
  success:
    'bg-[var(--success-soft)] text-[var(--success)] border border-[var(--success)] hover:bg-[var(--success)] hover:text-white hover:shadow-lg hover:shadow-[var(--success-glow)] transition-all duration-200 active:scale-95',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-lg gap-2',
  md: 'h-11 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-2xl gap-3',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'secondary', 
    size = 'md', 
    type = 'button',
    loading = false,
    disabled = false,
    icon,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={loading || disabled}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
          'disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 border-2 border-transparent border-t-current rounded-full animate-spin" />
            </div>
            <span>{children}</span>
          </>
        ) : (
          <>
            {icon}
            <span>{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
