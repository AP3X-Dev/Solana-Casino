import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  path: string;
  color: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  badge?: string;
}

const rarityStyles = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 via-orange-400 to-red-600',
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  image,
  path,
  color,
  rarity = 'common',
  badge,
}) => {
  return (
    <Link to={path}>
      <motion.div
        whileHover={{ y: -8, rotateZ: 2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        className={cn(
          'relative h-full p-6 rounded-2xl border-2 border-[var(--border)]',
          'bg-gradient-to-br from-[var(--card)] to-[var(--card-hover)]',
          'cursor-pointer overflow-hidden group transition-all duration-300'
        )}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />

        {/* Premium Glow Background */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={cn(
            'absolute inset-0 bg-gradient-to-br rounded-2xl blur-xl',
            `from-[var(--${color}-soft)] to-transparent`
          )}
        />

        {/* Content */}
        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
              className={cn(
                'h-16 w-16 rounded-2xl flex items-center justify-center',
                `bg-gradient-to-br ${rarityStyles[rarity]}`,
                'text-white shadow-lg flex-shrink-0'
              )}
            >
              <div className="text-4xl">{icon}</div>
            </motion.div>

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap',
                  'bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]',
                  'text-white shadow-lg'
                )}
              >
                {badge}
              </motion.div>
            )}
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 pt-4 border-t border-[var(--border)] group-hover:border-[var(--accent)] transition-colors"
          >
            <span className="text-sm font-semibold text-[var(--accent)] flex-1">
              Play Now
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hover Shine Effect */}
        <motion.div
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 rounded-2xl"
        />
      </motion.div>
    </Link>
  );
};

export default GameCard;
