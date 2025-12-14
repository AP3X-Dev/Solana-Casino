import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dices, Wallet, Settings, MessageSquare, PlusCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <Dices className="w-5 h-5" />, label: 'Games', path: '/games' },
    { icon: <PlusCircle className="w-5 h-5" />, label: 'Create Casino', path: '/create' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Telegram Bot', path: '/bot' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Wallets', path: '/wallets' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <Info className="w-5 h-5" />, label: 'About', path: '/about' },
  ];

  return (
    <div className="w-64 h-screen bg-[var(--sidebar)] border-r border-[var(--border)] fixed left-0 top-0">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-3 px-2 py-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
            <Dices className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <span className="text-lg font-bold">SolanaCasino</span>
        </Link>
      </div>

      <nav className="mt-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-[var(--text-primary)] transition-colors',
              location.pathname === item.path && 'bg-[var(--card)] text-[var(--text-primary)]'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
