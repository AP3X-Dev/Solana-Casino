import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, title, description, children, actions, className }) => {
  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className={cn(
                'relative w-full max-w-md rounded-2xl',
                'bg-[var(--card)] border border-[var(--border)] shadow-2xl',
                'p-6 space-y-4',
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--card-hover)] hover:bg-[var(--error-soft)] text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Header */}
              {(title || description) && (
                <div className="space-y-2 pr-8">
                  {title && <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>}
                  {description && <p className="text-sm text-[var(--text-secondary)]">{description}</p>}
                </div>
              )}

              {/* Content */}
              {children && <div className="text-[var(--text-primary)]">{children}</div>}

              {/* Actions */}
              {actions && (
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-[var(--border)]">
                  {actions}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
