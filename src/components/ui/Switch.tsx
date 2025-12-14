import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-8 w-14',
};

const dotSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, size = 'md', checked = false, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    return (
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          {label && <label className="text-sm font-semibold text-[var(--text-primary)]">{label}</label>}
          {description && <p className="text-xs text-[var(--text-secondary)] mt-0.5">{description}</p>}
        </div>
        
        <label className="relative cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            {...props}
          />
          
          <motion.div
            animate={{
              backgroundColor: isChecked
                ? 'rgba(0, 212, 255, 1)'
                : 'rgba(100, 100, 100, 0.3)',
              boxShadow: isChecked
                ? '0 0 20px rgba(0, 212, 255, 0.5)'
                : 'none'
            }}
            className={cn(
              'rounded-full border-2 border-transparent transition-all duration-300',
              sizeClasses[size],
              isChecked ? 'border-[var(--accent)]' : 'border-[var(--border)]'
            )}
          >
            <motion.div
              animate={{
                x: isChecked ? (size === 'sm' ? 18 : size === 'md' ? 22 : 30) : 2,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              className={cn(
                'bg-white rounded-full transition-all duration-200',
                dotSizeClasses[size]
              )}
            />
          </motion.div>
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
