import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Radar } from 'react-chartjs-2';
import '../../utils/chartSetup'; // Import Chart.js setup
import {
  TrendingUp, TrendingDown, Target, Zap, Trophy,
  DollarSign, BarChart3, PieChart, Activity,
  Download, Share, RefreshCw
} from 'lucide-react';

interface GameStatsData {
  totalGames: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
  biggestWin: number;
  longestStreak: number;
  averageBet: number;
  profitLoss: number;
  gamesPerHour: number;
  favoriteGame: string;
  timeSpent: number;
  lastPlayed: Date;
}

const EnhancedGameStats: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d' | 'all'>('24h');
  const [selectedMetric, setSelectedMetric] = useState<'profit' | 'volume' | 'games' | 'winRate'>('profit');
  const [isLoading, setIsLoading] = useState(false);
  const stats: GameStatsData = {
    totalGames: 1247,
    totalWagered: 156.78,
    totalWon: 142.34,
    winRate: 68.5,
    biggestWin: 25.67,
    longestStreak: 12,
    averageBet: 0.126,
    profitLoss: -14.44,
    gamesPerHour: 23.4,
    favoriteGame: 'Coin Flip',
    timeSpent: 47.5,
    lastPlayed: new Date(),
  };

  const handleRefresh = () => {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 800);
  };

  // Generate mock time series data
  const timeSeriesData = useMemo(() => {
    const now = Date.now();
    const intervals = timeRange === '1h' ? 12 : timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
    const intervalMs = timeRange === '1h' ? 5 * 60 * 1000 :
                     timeRange === '24h' ? 60 * 60 * 1000 :
                     timeRange === '7d' ? 24 * 60 * 60 * 1000 :
                     24 * 60 * 60 * 1000;

    return Array.from({ length: intervals }, (_, i) => ({
      timestamp: now - (intervals - 1 - i) * intervalMs,
      profit: (Math.random() - 0.5) * 10,
      volume: Math.random() * 20 + 5,
      games: Math.floor(Math.random() * 50) + 10,
      winRate: Math.random() * 40 + 40,
    }));
  }, [timeRange]);

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'var(--accent)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  const lineChartData = {
    labels: timeSeriesData.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
        data: timeSeriesData.map(d => d[selectedMetric]),
        borderColor: 'var(--accent)',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'var(--accent)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const gameDistributionData = {
    labels: ['Coin Flip', 'Dice Roll', 'Slots', 'Blackjack', 'Roulette'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          'rgba(0, 212, 255, 0.8)',
          'rgba(255, 107, 53, 0.8)',
          'rgba(0, 255, 136, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(0, 212, 255, 1)',
          'rgba(255, 107, 53, 1)',
          'rgba(0, 255, 136, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const performanceRadarData = {
    labels: ['Win Rate', 'Avg Bet', 'Risk Level', 'Consistency', 'Profit Margin', 'Game Variety'],
    datasets: [
      {
        label: 'Your Performance',
        data: [85, 70, 60, 75, 45, 90],
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        borderColor: 'rgba(0, 212, 255, 1)',
        pointBackgroundColor: 'rgba(0, 212, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 212, 255, 1)',
      },
      {
        label: 'Average Player',
        data: [65, 60, 70, 60, 55, 70],
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderColor: 'rgba(255, 107, 53, 1)',
        pointBackgroundColor: 'rgba(255, 107, 53, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 107, 53, 1)',
      },
    ],
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    format?: 'number' | 'currency' | 'percentage';
  }> = ({ title, value, change, icon: Icon, color, format = 'number' }) => {
    const formatValue = (val: string | number) => {
      if (typeof val === 'string') return val;
      switch (format) {
        case 'currency':
          return `${val.toFixed(4)} SOL`;
        case 'percentage':
          return `${val.toFixed(1)}%`;
        default:
          return val.toLocaleString();
      }
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="glass-effect rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              change >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'
            }`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          <div className="text-sm text-[var(--text-secondary)]">{title}</div>
        </div>

        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
              'linear-gradient(225deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
              'linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Game Analytics</h2>
          <p className="text-[var(--text-secondary)] mt-1">
            Comprehensive insights into your gaming performance
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-[var(--card)] rounded-xl p-1">
            {(['1h', '24h', '7d', '30d', 'all'] as const).map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {range.toUpperCase()}
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-3 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all"
            >
              <Download className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all"
            >
              <Share className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Wagered"
          value={stats.totalWagered}
          change={12.5}
          icon={DollarSign}
          color="from-blue-500 to-cyan-500"
          format="currency"
        />
        <StatCard
          title="Win Rate"
          value={stats.winRate}
          change={-2.3}
          icon={Target}
          color="from-green-500 to-emerald-500"
          format="percentage"
        />
        <StatCard
          title="Biggest Win"
          value={stats.biggestWin}
          change={45.2}
          icon={Trophy}
          color="from-yellow-500 to-orange-500"
          format="currency"
        />
        <StatCard
          title="Profit/Loss"
          value={stats.profitLoss}
          change={-8.7}
          icon={TrendingUp}
          color="from-purple-500 to-pink-500"
          format="currency"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-[var(--accent)]" />
              Performance Trend
            </h3>

            {/* Metric Selector */}
            <div className="flex items-center space-x-2">
              {(['profit', 'volume', 'games', 'winRate'] as const).map((metric) => (
                <motion.button
                  key={metric}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedMetric === metric
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Game Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <PieChart className="w-6 h-6 mr-2 text-[var(--accent)]" />
            Game Distribution
          </h3>

          <div className="h-64">
            <Doughnut
              data={gameDistributionData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    display: true,
                    position: 'bottom' as const,
                    labels: {
                      color: 'rgba(255, 255, 255, 0.7)',
                      usePointStyle: true,
                      padding: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Performance Radar & Additional Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 glass-effect rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-[var(--accent)]" />
            Performance Analysis
          </h3>

          <div className="h-80">
            <Radar
              data={performanceRadarData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    display: true,
                    position: 'top' as const,
                    labels: {
                      color: 'rgba(255, 255, 255, 0.7)',
                      usePointStyle: true,
                    },
                  },
                },
                scales: {
                  r: {
                    angleLines: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    pointLabels: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.5)',
                      backdropColor: 'transparent',
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-[var(--accent)]" />
            Quick Stats
          </h3>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Total Games</span>
              <span className="font-bold text-xl">{stats.totalGames.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Average Bet</span>
              <span className="font-bold text-xl">{stats.averageBet.toFixed(4)} SOL</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Longest Streak</span>
              <span className="font-bold text-xl text-[var(--success)]">{stats.longestStreak}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Games/Hour</span>
              <span className="font-bold text-xl">{stats.gamesPerHour.toFixed(1)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Time Spent</span>
              <span className="font-bold text-xl">{stats.timeSpent.toFixed(1)}h</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Favorite Game</span>
              <span className="font-bold text-xl text-[var(--accent)]">{stats.favoriteGame}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedGameStats;
