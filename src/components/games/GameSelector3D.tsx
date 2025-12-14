import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Coins, Dice1, Zap, Heart, Target, Crown,
  Play, Star, Trophy, Flame, Sparkles, Gem
} from 'lucide-react';

interface GameCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  minBet: number;
  maxPayout: string;
  players: number;
  gradient: string;
  bgImage: string;
  features: string[];
  isNew?: boolean;
  isHot?: boolean;
  comingSoon?: boolean;
}

const GAME_CARDS: GameCard[] = [
  {
    id: 'coinflip',
    title: 'Ultra Coin Flip',
    description: 'Classic 50/50 chance with stunning 3D physics and particle effects',
    icon: Coins,
    path: '/coinflip',
    difficulty: 'Easy',
    minBet: 0.01,
    maxPayout: '1.95x',
    players: 1247,
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    bgImage: '/images/coinflip-bg.jpg',
    features: ['Provably Fair', '3D Physics', 'Instant Results'],
    isHot: true,
  },
  {
    id: 'dice',
    title: 'Ultra Dice Roll',
    description: 'Roll the dice with customizable odds and massive multipliers',
    icon: Dice1,
    path: '/dice',
    difficulty: 'Medium',
    minBet: 0.01,
    maxPayout: '9.8x',
    players: 892,
    gradient: 'from-red-500 via-pink-500 to-purple-500',
    bgImage: '/images/dice-bg.jpg',
    features: ['Variable Odds', 'High Multipliers', 'Risk Control'],
  },
  {
    id: 'slots',
    title: 'Ultra Slots',
    description: 'Spin the reels with legendary symbols and progressive jackpots',
    icon: Zap,
    path: '/slots',
    difficulty: 'Easy',
    minBet: 0.01,
    maxPayout: '25x',
    players: 2156,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    bgImage: '/images/slots-bg.jpg',
    features: ['Progressive Jackpot', 'Bonus Rounds', 'Free Spins'],
    isNew: true,
  },
  {
    id: 'blackjack',
    title: 'Ultra Blackjack',
    description: 'Beat the dealer with perfect strategy and card counting hints',
    icon: Heart,
    path: '/blackjack',
    difficulty: 'Hard',
    minBet: 0.1,
    maxPayout: '2.5x',
    players: 634,
    gradient: 'from-gray-700 via-gray-800 to-black',
    bgImage: '/images/blackjack-bg.jpg',
    features: ['Strategy Hints', 'Card Counting', 'Side Bets'],
    comingSoon: true,
  },
  {
    id: 'roulette',
    title: 'Ultra Roulette',
    description: 'European roulette with advanced betting options and statistics',
    icon: Target,
    path: '/roulette',
    difficulty: 'Medium',
    minBet: 0.01,
    maxPayout: '35x',
    players: 445,
    gradient: 'from-red-600 via-red-700 to-red-900',
    bgImage: '/images/roulette-bg.jpg',
    features: ['European Rules', 'Advanced Bets', 'Hot Numbers'],
    comingSoon: true,
  },
  {
    id: 'poker',
    title: 'Ultra Poker',
    description: 'Texas Hold\'em with AI opponents and tournament modes',
    icon: Crown,
    path: '/poker',
    difficulty: 'Hard',
    minBet: 0.5,
    maxPayout: '1000x',
    players: 1823,
    gradient: 'from-purple-600 via-purple-700 to-indigo-800',
    bgImage: '/images/poker-bg.jpg',
    features: ['AI Opponents', 'Tournaments', 'Bluff Detection'],
    comingSoon: true,
  },
];

const GameSelector3D: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredGames = GAME_CARDS.filter(game => {
    if (selectedFilter === 'all') return true;
    return game.difficulty.toLowerCase() === selectedFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] p-6 pt-24">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-3xl opacity-10 animate-float pointer-events-none"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--secondary-glow)] rounded-full blur-3xl opacity-10 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[var(--gold-glow)] rounded-full blur-3xl opacity-5 animate-pulse-glow pointer-events-none"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <Sparkles className="w-16 h-16 text-[var(--gold)]" />
            </motion.div>
            <h1 className="text-7xl font-black gradient-text">
              GAME UNIVERSE
            </h1>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="ml-4"
            >
              <Crown className="w-16 h-16 text-[var(--gold)]" />
            </motion.div>
          </div>

          <p className="text-2xl text-[var(--text-secondary)] max-w-4xl mx-auto mb-8">
            Enter a world of next-generation gaming with stunning 3D graphics,
            provably fair mechanics, and life-changing jackpots
          </p>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center space-x-4">
            {(['all', 'easy', 'medium', 'hard'] as const).map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] text-white shadow-2xl'
                    : 'bg-[var(--card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Game Cards Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10"
          layout
        >
          <AnimatePresence>
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: hoveredCard === game.id ? 5 : 0,
                  scale: 1.02
                }}
                onHoverStart={() => setHoveredCard(game.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative perspective-1000 z-10 game-card"
              >
                {/* Card Container */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden transform-gpu preserve-3d">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${game.bgImage})`,
                      filter: 'brightness(0.3)'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-80`} />

                  {/* Glass Effect */}
                  <div className="absolute inset-0 glass-effect" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-8 text-white">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={hoveredCard === game.id ? {
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ duration: 1 }}
                          className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm"
                        >
                          <game.icon className="w-8 h-8" />
                        </motion.div>

                        <div>
                          <h3 className="text-2xl font-bold">{game.title}</h3>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                            {game.difficulty}
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-col space-y-2">
                        {game.isNew && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-3 py-1 bg-[var(--success)] rounded-full text-xs font-bold"
                          >
                            NEW
                          </motion.div>
                        )}
                        {game.isHot && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="px-3 py-1 bg-[var(--error)] rounded-full text-xs font-bold flex items-center"
                          >
                            <Flame className="w-3 h-3 mr-1" />
                            HOT
                          </motion.div>
                        )}
                        {game.comingSoon && (
                          <div className="px-3 py-1 bg-[var(--warning)] text-black rounded-full text-xs font-bold">
                            SOON
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 mb-6 flex-grow">
                      {game.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {game.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="px-3 py-1 bg-white/20 rounded-lg text-sm backdrop-blur-sm"
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{game.minBet} SOL</div>
                        <div className="text-xs text-white/60">Min Bet</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{game.maxPayout}</div>
                        <div className="text-xs text-white/60">Max Payout</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{game.players.toLocaleString()}</div>
                        <div className="text-xs text-white/60">Players</div>
                      </div>
                    </div>

                    {/* Play Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {game.comingSoon ? (
                        <button
                          disabled
                          className="w-full py-4 rounded-2xl bg-gray-500/50 text-white font-bold text-lg cursor-not-allowed"
                        >
                          Coming Soon
                        </button>
                      ) : (
                        <Link
                          to={game.path}
                          className="block w-full py-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-lg text-center transition-all duration-300 border border-white/30 hover:border-white/50 relative z-20"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Play className="w-6 h-6" />
                            <span>PLAY NOW</span>
                            <Star className="w-6 h-6" />
                          </div>
                        </Link>
                      )}
                    </motion.div>
                  </div>

                  {/* Hover Effects */}
                  <AnimatePresence>
                    {hoveredCard === game.id && (
                      <>
                        {/* Particle Effects */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-white rounded-full"
                              initial={{
                                x: '50%',
                                y: '50%',
                                scale: 0,
                                opacity: 0
                              }}
                              animate={{
                                x: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                                y: `${50 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </motion.div>

                        {/* Glow Effect */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -inset-2 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-3xl blur-xl opacity-30"
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-3xl p-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Ready to Win Big?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              Join thousands of players and experience the future of online gaming
            </p>
            <div className="flex items-center justify-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] text-white font-bold text-lg shadow-2xl"
              >
                <div className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6" />
                  <span>Join Tournament</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] font-bold text-lg transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Gem className="w-6 h-6" />
                  <span>VIP Program</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameSelector3D;
