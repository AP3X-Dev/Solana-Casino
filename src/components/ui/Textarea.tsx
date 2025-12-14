import * as React from 'react';
import { cn } from '../../utils/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  variant?: 'default' | 'premium';
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, error = false, variant = 'default', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full rounded-xl px-4 py-3 transition-all duration-200 resize-none',
          'bg-[var(--card)] border-2',
          error ? 'border-[var(--error)] focus:border-[var(--error)] focus:shadow-lg focus:shadow-[var(--error-glow)]' :
          variant === 'premium' ?
          'border-[var(--border)] focus:border-[var(--accent)] focus:shadow-lg focus:shadow-[var(--accent-glow)] focus:bg-gradient-to-r focus:from-[var(--accent-soft)] focus:to-[var(--secondary-soft)]' :
          'border-[var(--border)] focus:border-[var(--accent)]',
          'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
          'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
