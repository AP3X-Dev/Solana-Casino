import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({ title, subtitle, eyebrow, icon, actions, className }: PageHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}
    >
      <div className="space-y-4 flex-1">
        {eyebrow && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block"
          >
            <span className="text-sm font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full">
              {eyebrow}
            </span>
          </motion.div>
        )}
        
        <div className="flex items-start gap-4">
          {icon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className={cn(
                'h-14 w-14 rounded-2xl flex-shrink-0',
                'bg-gradient-to-br from-[var(--accent-soft)] to-[var(--secondary-soft)]',
                'border-2 border-[var(--border-hover)]',
                'flex items-center justify-center'
              )}
            >
              {icon}
            </motion.div>
          )}
          
          <div className="flex-1 min-w-0">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent)] to-[var(--secondary)] bg-clip-text text-transparent leading-tight"
            >
              {title}
            </motion.h1>
          </div>
        </div>

        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[var(--text-secondary)] max-w-2xl text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {actions && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center gap-3 md:justify-end"
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageHeader;

