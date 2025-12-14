import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from './Card';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: 'accent' | 'success' | 'error' | 'warning' | 'gold';
}

const accentClasses = {
  accent: 'from-[var(--accent-soft)] to-[var(--accent-soft)]',
  success: 'from-[var(--success-soft)] to-[var(--success-soft)]',
  error: 'from-[var(--error-soft)] to-[var(--error-soft)]',
  warning: 'from-[var(--warning-soft)] to-[var(--warning-soft)]',
  gold: 'from-[var(--gold)]  via-[var(--gold)] to-[var(--secondary)]',
};

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  change,
  trend = 'up',
  accent = 'accent'
}) => {
  const isPositive = trend === 'up';
  
  return (
    <Card 
      interactive 
      variant={accent === 'gold' ? 'premium' : 'gradient'}
      glow
      className="p-0 overflow-hidden relative group"
    >
      <div className={cn(
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
        `bg-gradient-to-br ${accentClasses[accent]}`
      )} />
      
      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className={cn(
                'h-14 w-14 rounded-2xl flex items-center justify-center',
                'bg-[var(--card-hover)] border-2 border-[var(--border)]',
                'group-hover:border-[var(--accent)] group-hover:scale-110 transition-all duration-300'
              )}>
                {icon}
              </div>
              <div className={cn(
                'absolute -inset-3 rounded-3xl opacity-40 group-hover:opacity-60',
                `-z-10 transition-all duration-300 blur-xl`,
                `bg-gradient-to-br ${accentClasses[accent]}`
              )} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-[var(--text-secondary)] truncate">{title}</div>
              <div className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                {value}
              </div>
            </div>
          </div>

          <div
            className={cn(
              'shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold whitespace-nowrap',
              'transition-all duration-300 group-hover:scale-110',
              isPositive ? 'bg-[var(--success-soft)] text-[var(--success)]' : 'bg-[var(--error-soft)] text-[var(--error)]'
            )}
          >
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        </div>

        <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isPositive ? 'bg-gradient-to-r from-[var(--success)] to-[#00cc70]' : 'bg-gradient-to-r from-[var(--error)] to-[#e63946]'
            )}
            style={{ width: isPositive ? '75%' : '45%' }}
          />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
