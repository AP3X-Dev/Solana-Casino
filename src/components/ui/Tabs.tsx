import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: 'default' | 'underline' | 'pills';
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    items,
    defaultValue,
    onChange,
    className,
    variant = 'default',
  }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue || items[0]?.value);

    const handleTabChange = (value: string) => {
      setActiveTab(value);
      onChange?.(value);
    };

    const tabListVariants = {
      default: 'flex gap-2 border-b-2 border-[var(--border)] overflow-x-auto',
      underline: 'flex gap-4 border-b-2 border-[var(--border)]',
      pills: 'flex gap-3 p-1 bg-[var(--card)] rounded-xl',
    };

    const tabButtonVariants = {
      default: 'px-4 py-3 border-b-2 border-transparent hover:border-[var(--border)] transition-colors',
      underline: 'px-4 py-3 border-b-2 border-transparent hover:border-[var(--accent)] transition-colors',
      pills: 'px-4 py-2 rounded-lg transition-all',
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Tab List */}
        <div className={tabListVariants[variant]}>
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => handleTabChange(item.value)}
              className={cn(
                tabButtonVariants[variant],
                'relative font-medium flex items-center gap-2 whitespace-nowrap text-sm',
                activeTab === item.value
                  ? variant === 'pills'
                    ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]'
                    : 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[var(--error)] text-white font-bold"
                >
                  {item.badge}
                </motion.span>
              )}
              {variant !== 'pills' && activeTab === item.value && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {items.find((item) => item.value === activeTab)?.content}
        </motion.div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;
