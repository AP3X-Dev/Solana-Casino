import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type AlertVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  closeable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const variantClasses: Record<AlertVariant, { bg: string; border: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  default: {
    bg: 'bg-[var(--info-soft)]',
    border: 'border-[var(--info)]',
    text: 'text-[var(--info)]',
    icon: Info,
  },
  success: {
    bg: 'bg-[var(--success-soft)]',
    border: 'border-[var(--success)]',
    text: 'text-[var(--success)]',
    icon: CheckCircle,
  },
  error: {
    bg: 'bg-[var(--error-soft)]',
    border: 'border-[var(--error)]',
    text: 'text-[var(--error)]',
    icon: AlertTriangle,
  },
  warning: {
    bg: 'bg-[var(--warning-soft)]',
    border: 'border-[var(--warning)]',
    text: 'text-[var(--warning)]',
    icon: AlertCircle,
  },
  info: {
    bg: 'bg-[var(--info-soft)]',
    border: 'border-[var(--info)]',
    text: 'text-[var(--info)]',
    icon: Info,
  },
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'default',
    title,
    description,
    closeable = false,
    onClose,
    icon,
    action,
    className,
    children,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    const variantClass = variantClasses[variant];
    const IconComponent = icon || variantClass.icon;

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'relative rounded-xl border-2 p-4 flex gap-4',
              variantClass.bg,
              variantClass.border,
              className
            )}
            {...props}
          >
            {/* Icon */}
            <div className={cn('flex-shrink-0 mt-0.5', variantClass.text)}>
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              {title && (
                <h4 className={cn('font-bold', variantClass.text)}>
                  {title}
                </h4>
              )}
              {description && (
                <p className={cn('text-sm', variantClass.text, 'opacity-90')}>
                  {description}
                </p>
              )}
              {children && (
                <div className={cn('text-sm', variantClass.text)}>
                  {children}
                </div>
              )}
            </div>

            {/* Action */}
            {action && (
              <div className="flex-shrink-0">
                {action}
              </div>
            )}

            {/* Close Button */}
            {closeable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className={cn(
                  'absolute top-4 right-4 p-1 rounded-lg transition-colors',
                  variantClass.text,
                  'hover:bg-black/10'
                )}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
