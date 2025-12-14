import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(false);

    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative h-6 w-6">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            onChange={(e) => setIsChecked(e.target.checked)}
            checked={isChecked}
            {...props}
          />
          <div
            className={cn(
              'h-6 w-6 rounded-lg border-2 transition-all duration-200',
              'flex items-center justify-center',
              isChecked
                ? 'border-[var(--accent)] bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] shadow-lg shadow-[var(--accent-glow)]'
                : 'border-[var(--border)] bg-[var(--card)] group-hover:border-[var(--accent)]',
              className
            )}
          >
            {isChecked && (
              <Check className="w-4 h-4 text-white animate-scale-in" />
            )}
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
