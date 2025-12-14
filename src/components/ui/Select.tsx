import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'premium';
  size?: 'sm' | 'md' | 'lg';
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({
    options,
    value,
    onChange,
    placeholder = 'Select an option...',
    icon,
    disabled = false,
    variant = 'default',
    size = 'md',
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<SelectOption | undefined>(
      options.find(opt => opt.value === value)
    );
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    const handleSelect = (option: SelectOption) => {
      setSelected(option);
      onChange?.(option.value);
      setIsOpen(false);
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={ref} className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            'w-full rounded-xl transition-all duration-200 flex items-center justify-between',
            'border-2 focus:outline-none',
            sizeClasses[size],
            variant === 'premium'
              ? 'border-[var(--border)] bg-gradient-to-r from-[var(--accent-soft)] to-[var(--secondary-soft)] focus:border-[var(--accent)] focus:shadow-lg focus:shadow-[var(--accent-glow)]'
              : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] focus:border-[var(--accent)]',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className="flex items-center gap-2">
            {icon && <span className="text-[var(--text-secondary)]">{icon}</span>}
            <span className={selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
              {selected?.label || placeholder}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full z-50 bg-[var(--card)] border-2 border-[var(--border)] rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto">
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'w-full text-left px-4 py-3 transition-all duration-200 border-b border-[var(--border)] last:border-b-0',
                      'hover:bg-[var(--card-hover)] hover:border-[var(--accent)]',
                      selected?.value === option.value && 'bg-[var(--accent-soft)] border-[var(--accent)]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-medium text-[var(--text-primary)]">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-[var(--text-secondary)] mt-1">{option.description}</div>
                        )}
                      </div>
                      {selected?.value === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-white text-xs font-bold">✓</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
