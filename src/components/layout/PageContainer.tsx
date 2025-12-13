import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PageContainerProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, description, actions, children }) => {
  return (
    <div className="px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {(title || description || actions) && (
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[var(--card)]/80 border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-lg shadow-black/20 backdrop-blur-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  <Sparkles className="w-4 h-4 mr-2 text-[var(--accent)]" />
                  Platform Overview
                </div>
                {title && <h1 className="text-3xl md:text-4xl font-black leading-tight gradient-text">{title}</h1>}
                {description && <p className="text-[var(--text-secondary)] max-w-3xl">{description}</p>}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
          </motion.header>
        )}

        {children}
      </div>
    </div>
  );
};

export default PageContainer;
