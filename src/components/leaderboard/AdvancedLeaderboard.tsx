import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Crown, Medal, Star, TrendingUp, TrendingDown,
  Target, Coins, Search,
  Award, Flame, Gem, Sparkles
} from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  address: string;
  username: string;
  avatar: string;
  totalWagered: number;
  totalWon: number;
  profitLoss: number;
  winRate: number;
  gamesPlayed: number;
  biggestWin: number;
  streak: number;
  level: number;
  badges: string[];
  isOnline: boolean;
  lastActive: Date;
  country: string;
}

interface LeaderboardProps {
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'allTime';
  category?: 'profit' | 'volume' | 'winRate' | 'biggestWin';
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    previousRank: 2,
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHkv',
    username: 'CryptoKing',
    avatar: '/avatars/1.jpg',
    totalWagered: 1247.89,
    totalWon: 1456.23,
    profitLoss: 208.34,
    winRate: 72.5,
    gamesPlayed: 2847,
    biggestWin: 125.67,
    streak: 15,
    level: 42,
    badges: ['whale', 'streak', 'winner'],
    isOnline: true,
    lastActive: new Date(),
    country: 'US',
  },
  {
    rank: 2,
    previousRank: 1,
    address: '9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHkv',
    username: 'DiamondHands',
    avatar: '/avatars/2.jpg',
    totalWagered: 2156.45,
    totalWon: 2298.12,
    profitLoss: 141.67,
    winRate: 68.2,
    gamesPlayed: 3421,
    biggestWin: 89.34,
    streak: 8,
    level: 38,
    badges: ['volume', 'consistent'],
    isOnline: false,
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    country: 'CA',
  },
  // Add more mock data...
];

const AdvancedLeaderboard: React.FC<LeaderboardProps> = ({
  timeframe = 'weekly',
  category = 'profit'
}) => {
  const [leaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [searchTerm, setSearchTerm] = useState('');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-[var(--gold)]" />;
      case 2:
        return <Medal className="w-8 h-8 text-[var(--silver)]" />;
      case 3:
        return <Award className="w-8 h-8 text-[var(--bronze)]" />;
      default:
        return <div className="w-8 h-8 rounded-full bg-[var(--card-hover)] flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return { type: 'up', change: previous - current };
    } else if (current > previous) {
      return { type: 'down', change: current - previous };
    }
    return { type: 'same', change: 0 };
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'whale':
        return <Gem className="w-4 h-4" />;
      case 'streak':
        return <Flame className="w-4 h-4" />;
      case 'winner':
        return <Trophy className="w-4 h-4" />;
      case 'volume':
        return <Coins className="w-4 h-4" />;
      case 'consistent':
        return <Target className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-4xl font-bold gradient-text flex items-center">
            <Trophy className="w-10 h-10 mr-3 text-[var(--gold)]" />
            Leaderboard
          </h2>
          <p className="text-[var(--text-secondary)] mt-2">
            Compete with the best players and climb the ranks
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-all w-64"
            />
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center space-x-2 bg-[var(--card)] rounded-xl p-1">
            {(['daily', 'weekly', 'monthly', 'allTime'] as const).map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTimeframe(time)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTimeframe === time
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {time === 'allTime' ? 'All Time' : time.charAt(0).toUpperCase() + time.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Category Selector */}
          <div className="flex items-center space-x-2 bg-[var(--card)] rounded-xl p-1">
            {(['profit', 'volume', 'winRate', 'biggestWin'] as const).map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[var(--secondary)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat === 'winRate' ? 'Win Rate' : 
                 cat === 'biggestWin' ? 'Biggest Win' :
                 cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {([1, 0, 2] as const).map((actualIndex, index) => {
          const player = filteredLeaderboard[actualIndex];
          if (!player) return null;

          return (
            <motion.div
              key={player.address}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${
                player.rank === 1 ? 'md:order-2 md:scale-110' : 
                player.rank === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className={`glass-effect rounded-3xl p-6 text-center relative overflow-hidden ${
                player.rank === 1 ? 'border-2 border-[var(--gold)]' :
                player.rank === 2 ? 'border-2 border-[var(--silver)]' :
                'border-2 border-[var(--bronze)]'
              }`}>
                {/* Background Glow */}
                <div className={`absolute inset-0 opacity-20 ${
                  player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  'bg-gradient-to-br from-orange-400 to-red-500'
                }`} />

                {/* Rank Badge */}
                <div className="relative mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mx-auto w-16 h-16 flex items-center justify-center"
                  >
                    {getRankIcon(player.rank)}
                  </motion.div>
                  
                  {player.rank === 1 && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="w-6 h-6 text-[var(--gold)]" />
                    </motion.div>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] p-1">
                    <div className="w-full h-full rounded-full bg-[var(--card)] flex items-center justify-center text-2xl font-bold">
                      {player.username.charAt(0)}
                    </div>
                  </div>
                  {player.isOnline && (
                    <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[var(--success)] rounded-full border-2 border-[var(--card)]" />
                  )}
                </div>

                {/* Player Info */}
                <h3 className="text-xl font-bold mb-2">{player.username}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {player.address.slice(0, 6)}...{player.address.slice(-4)}
                </p>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Profit:</span>
                    <span className={`font-bold ${player.profitLoss >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                      {player.profitLoss >= 0 ? '+' : ''}{player.profitLoss.toFixed(2)} SOL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Win Rate:</span>
                    <span className="font-bold">{player.winRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Level:</span>
                    <span className="font-bold text-[var(--accent)]">{player.level}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex justify-center space-x-2 mt-4">
                  {player.badges.map((badge, idx) => (
                    <motion.div
                      key={badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="p-2 rounded-lg bg-[var(--card-hover)] text-[var(--accent)]"
                      title={badge}
                    >
                      {getBadgeIcon(badge)}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="glass-effect rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--card-hover)]">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Rank</th>
                <th className="px-6 py-4 text-left font-semibold">Player</th>
                <th className="px-6 py-4 text-right font-semibold">Profit/Loss</th>
                <th className="px-6 py-4 text-right font-semibold">Volume</th>
                <th className="px-6 py-4 text-right font-semibold">Win Rate</th>
                <th className="px-6 py-4 text-right font-semibold">Games</th>
                <th className="px-6 py-4 text-right font-semibold">Biggest Win</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredLeaderboard.slice(3).map((entry, index) => {
                  const rankChange = getRankChange(entry.rank, entry.previousRank);
                  
                  return (
                    <motion.tr
                      key={entry.address}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
                    >
                      {/* Rank */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg font-bold">{entry.rank}</div>
                          {rankChange.type !== 'same' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`flex items-center text-xs ${
                                rankChange.type === 'up' ? 'text-[var(--success)]' : 'text-[var(--error)]'
                              }`}
                            >
                              {rankChange.type === 'up' ? 
                                <TrendingUp className="w-3 h-3 mr-1" /> : 
                                <TrendingDown className="w-3 h-3 mr-1" />
                              }
                              {rankChange.change}
                            </motion.div>
                          )}
                        </div>
                      </td>

                      {/* Player */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center text-sm font-bold">
                              {entry.username.charAt(0)}
                            </div>
                            {entry.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--success)] rounded-full border border-[var(--card)]" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{entry.username}</div>
                            <div className="text-sm text-[var(--text-secondary)]">
                              {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {entry.badges.slice(0, 3).map((badge, idx) => (
                              <div key={idx} className="p-1 rounded bg-[var(--card-hover)] text-[var(--accent)]">
                                {getBadgeIcon(badge)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Profit/Loss */}
                      <td className="px-6 py-4 text-right">
                        <div className={`font-bold ${entry.profitLoss >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                          {entry.profitLoss >= 0 ? '+' : ''}{entry.profitLoss.toFixed(2)} SOL
                        </div>
                      </td>

                      {/* Volume */}
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium">{entry.totalWagered.toFixed(2)} SOL</div>
                      </td>

                      {/* Win Rate */}
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium">{entry.winRate.toFixed(1)}%</div>
                      </td>

                      {/* Games */}
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium">{entry.gamesPlayed.toLocaleString()}</div>
                      </td>

                      {/* Biggest Win */}
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium text-[var(--gold)]">{entry.biggestWin.toFixed(2)} SOL</div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          entry.isOnline 
                            ? 'bg-[var(--success)]/20 text-[var(--success)]' 
                            : 'bg-[var(--text-secondary)]/20 text-[var(--text-secondary)]'
                        }`}>
                          {entry.isOnline ? 'Online' : 'Offline'}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLeaderboard;
