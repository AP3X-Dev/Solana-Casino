import { Trophy, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import RecentGames from '../components/dashboard/RecentGames';
import TopTokens from '../components/dashboard/TopTokens';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="dashboard-container space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Trophy className="w-8 h-8 text-yellow-400" />}
          title="Total Winnings"
          value="1,234 SOL"
          change="+12.5%"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-blue-400" />}
          title="Active Players"
          value="567"
          change="+5.2%"
        />
        <StatCard
          icon={<Wallet className="w-8 h-8 text-green-400" />}
          title="Total Volume"
          value="45,678 SOL"
          change="+8.7%"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentGames />
        <TopTokens />
      </div>
    </motion.div>
  );
};

export default Dashboard;
