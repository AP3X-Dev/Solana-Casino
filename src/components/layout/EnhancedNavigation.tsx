import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  Home, Gamepad2, BarChart3, Trophy, Settings, Menu, X,
  Coins, Dice1, Zap, Crown,
  User, LogOut, Bell, Search
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: Home,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Overview & Analytics'
  },
  {
    path: '/games',
    label: 'Games',
    icon: Gamepad2,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Play & Win'
  },
  {
    path: '/coinflip',
    label: 'Coin Flip',
    icon: Coins,
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Classic 50/50'
  },
  {
    path: '/dice',
    label: 'Dice Roll',
    icon: Dice1,
    gradient: 'from-red-500 to-pink-500',
    description: 'Roll the Dice'
  },
  {
    path: '/slots',
    label: 'Slots',
    icon: Zap,
    gradient: 'from-green-500 to-emerald-500',
    description: 'Spin to Win'
  },
  {
    path: '/tournaments',
    label: 'Tournaments',
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    description: 'Compete & Earn'
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Stats & Insights'
  },
];

const EnhancedNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const location = useLocation();
  const { connected, publicKey, disconnect } = useWallet();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--card)]/95 backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-xl opacity-0 group-hover:opacity-30 blur-lg"
                  whileHover={{ scale: 1.2 }}
                />
              </motion.div>
              <div>
                <div className="text-xl font-black gradient-text">SOLANA CASINO</div>
                <div className="text-xs text-[var(--text-secondary)]">Ultra Gaming Platform</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.path}
                  onHoverStart={() => setActiveHover(item.path)}
                  onHoverEnd={() => setActiveHover(null)}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.path)
                        ? 'text-white'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>

                    {/* Active Background */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl`}
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover Background */}
                    {activeHover === item.path && !isActive(item.path) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-[var(--card-hover)] rounded-xl"
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </Link>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {activeHover === item.path && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-xl z-30"
                      >
                        <div className="text-sm font-medium text-[var(--text-primary)]">{item.label}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{item.description}</div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--card)] border-l border-t border-[var(--border)] rotate-45"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-3 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all duration-300"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-3 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all duration-300 relative"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--error)] rounded-full animate-pulse"></div>
              </motion.button>

              {/* Wallet Connection */}
              <div className="relative">
                {connected ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3"
                  >
                    {/* User Menu */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-medium">
                          {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">Connected</div>
                      </div>
                    </motion.button>

                    {/* Disconnect Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={disconnect}
                      className="p-3 rounded-xl bg-[var(--error)]/20 hover:bg-[var(--error)] text-[var(--error)] hover:text-white transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="wallet-adapter-button-trigger"
                  >
                    <WalletMultiButton className="!bg-gradient-to-r !from-[var(--accent)] !to-[var(--secondary)] !rounded-xl !font-bold !px-6 !py-3 !transition-all !duration-300 hover:!scale-105" />
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[45] lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-[var(--card)] border-l border-[var(--border)] z-[46] lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-lg flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold gradient-text">SOLANA CASINO</div>
                      <div className="text-xs text-[var(--text-secondary)]">Mobile Menu</div>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                            : 'hover:bg-[var(--card-hover)]'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isActive(item.path)
                            ? 'bg-white/20'
                            : 'bg-[var(--card-hover)]'
                        }`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className={`text-sm ${
                            isActive(item.path)
                              ? 'text-white/70'
                              : 'text-[var(--text-secondary)]'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="mt-8 pt-8 border-t border-[var(--border)] space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search Games</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-20" />
    </>
  );
};

export default EnhancedNavigation;
