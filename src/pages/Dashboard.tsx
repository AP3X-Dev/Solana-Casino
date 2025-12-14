import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { BarChart3, Coins, Gamepad2, Trophy, Users, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import RecentGames from '../components/dashboard/RecentGames';
import TopTokens from '../components/dashboard/TopTokens';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const Dashboard = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();

  const shortAddress = publicKey ? `${publicKey.toString().slice(0, 4)}…${publicKey.toString().slice(-4)}` : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative dashboard-container overflow-hidden">
      {/* Premium Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-[var(--accent-glow)] to-[var(--secondary-glow)] blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--secondary-glow)] blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold-glow)] blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-6 py-10 space-y-8"
      >
        <motion.div variants={itemVariants}>
          <PageHeader
            eyebrow={connected && shortAddress ? `Connected • ${shortAddress}` : 'Welcome to Solana Casino'}
            title="Dashboard"
            subtitle="Track performance, discover games, and play with provably fair outcomes."
            icon={<Trophy className="h-6 w-6 text-[var(--gold)]" />}
            actions={
              <>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/games')}
                  className="group"
                >
                  <Gamepad2 className="h-4 w-4 group-hover:animate-bounce" />
                  Play games
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/analytics')}
                  className="hover:border-[var(--accent)]"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/create')}
                  className="hover:border-[var(--secondary)]"
                >
                  <Coins className="h-4 w-4" />
                  Create casino
                </Button>
              </>
            }
          />
        </motion.div>

        {!connected ? (
          <motion.div variants={itemVariants}>
            <Card variant="premium" interactive glow elevated className="overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-soft)] via-transparent to-[var(--secondary-soft)] opacity-0 hover:opacity-30 transition-opacity" />
              <CardContent className="relative pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 flex-1">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold"
                  >
                    Connect your wallet to start playing
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-sm"
                  >
                    Connect Phantom to play the Ultra games, track your history, and view your wallet stats. Start winning SOL today!
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="wallet-adapter-button-trigger flex-shrink-0"
                >
                  <WalletMultiButton className="!bg-gradient-to-r !from-[var(--accent)] !to-[var(--secondary)] !rounded-2xl !font-bold !px-8 !py-3 !text-lg !transition-all !duration-300 hover:!scale-105 hover:!shadow-lg hover:!shadow-[var(--accent-glow)]" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Trophy className="w-6 h-6 text-[var(--gold)]" />,
              title: "Total Winnings",
              value: "1,234 SOL",
              change: "+12.5%",
              accent: "gold" as const
            },
            {
              icon: <Users className="w-6 h-6 text-[var(--accent)]" />,
              title: "Active Players",
              value: "567",
              change: "+5.2%",
              accent: "accent" as const
            },
            {
              icon: <Wallet className="w-6 h-6 text-[var(--success)]" />,
              title: "Total Volume",
              value: "45,678 SOL",
              change: "+8.7%",
              accent: "success" as const
            },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StatCard
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                accent={stat.accent}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <motion.div variants={itemVariants}>
            <RecentGames />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TopTokens />
          </motion.div>
        </motion.div>

        {connected && (
          <motion.div 
            variants={itemVariants}
            className="mt-12"
          >
            <Card variant="gradient" interactive glow className="p-8 text-center space-y-4 cursor-pointer"
              onClick={() => navigate('/tournaments')}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <Sparkles className="h-12 w-12 text-[var(--gold)] mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold">Join the Next Tournament</h3>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Compete with other players, climb the leaderboard, and win exclusive rewards!</p>
              <Button variant="primary" className="mx-auto">
                View Tournaments
              </Button>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
