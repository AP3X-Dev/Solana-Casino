import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coins, Volume2, VolumeX, Settings, History, Trophy, 
  Zap, Target, TrendingUp, Star, Crown, Gem 
} from 'lucide-react';
import { useEnhancedGame } from '../../hooks/useEnhancedGame';

interface CoinFlipState {
  prediction: 'heads' | 'tails';
  betAmount: string;
  isFlipping: boolean;
  showParticles: boolean;
  coinRotation: number;
  streakCount: number;
  multiplier: number;
}

const UltraCoinFlip: React.FC = () => {
  const [state, setState] = useState<CoinFlipState>({
    prediction: 'heads',
    betAmount: '0.1',
    isFlipping: false,
    showParticles: false,
    coinRotation: 0,
    streakCount: 0,
    multiplier: 1.95,
  });

  const {
    gameState,
    gameHistory,
    gameStats,
    balance,
    isConnected,
    soundEnabled,
    placeBet,
    setSoundEnabled,
  } = useEnhancedGame('coinflip');

  const coinRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Create particle explosion effect
  const createParticleExplosion = useCallback(() => {
    if (!particlesRef.current) return;

    const colors = ['#00d4ff', '#ff6b35', '#00ff88', '#ffd700'];
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full animate-confetti';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      particle.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 4000);
    }
  }, []);

  // Enhanced coin flip with 3D physics
  const handleFlip = useCallback(async () => {
    if (!isConnected || gameState.isPlaying) return;

    setState(prev => ({ ...prev, isFlipping: true, showParticles: true }));

    try {
      // Create particle explosion effect
      createParticleExplosion();
      
      // Enhanced coin rotation with realistic physics
      const rotations = 8 + Math.random() * 4; // 8-12 rotations
      setState(prev => ({ 
        ...prev, 
        coinRotation: prev.coinRotation + (rotations * 360) 
      }));

      await placeBet(parseFloat(state.betAmount), { choice: state.prediction });
    } catch (error) {
      console.error('Flip failed:', error);
    } finally {
      setState(prev => ({ ...prev, isFlipping: false }));
      setTimeout(() => {
        setState(prev => ({ ...prev, showParticles: false }));
      }, 2000);
    }
  }, [isConnected, gameState.isPlaying, state.betAmount, state.prediction, placeBet, createParticleExplosion]);

  // Update streak count based on game results
  useEffect(() => {
    if (!gameState.result) return;

    const { won } = gameState.result;
    setState(prev => ({
      ...prev,
      streakCount: won ? prev.streakCount + 1 : 0
    }));
  }, [gameState.result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--accent-glow)] rounded-full blur-3xl opacity-20 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--secondary-glow)] rounded-full blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <Coins className="w-12 h-12 text-[var(--accent)]" />
            </motion.div>
            <h1 className="text-6xl font-black gradient-text">
              ULTRA COIN FLIP
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="ml-4"
            >
              <Crown className="w-12 h-12 text-[var(--gold)]" />
            </motion.div>
          </div>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Experience the most advanced coin flip game with stunning 3D physics, 
            particle effects, and real-time multiplayer action!
          </p>

          {/* Streak Display */}
          <AnimatePresence>
            {state.streakCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-glow)] rounded-full text-black font-bold text-lg glow-effect"
              >
                <Trophy className="w-6 h-6 mr-2" />
                {state.streakCount} WIN STREAK!
                <Star className="w-6 h-6 ml-2 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="xl:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Particle Container */}
              <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10"></div>

              {/* 3D Coin */}
              <div className="flex justify-center mb-12 relative">
                <motion.div
                  ref={coinRef}
                  className="relative w-48 h-48 perspective-1000"
                  animate={{
                    rotateY: state.coinRotation,
                    scale: gameState.isPlaying ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    rotateY: { duration: 3, ease: "easeOut" },
                    scale: { duration: 0.5, repeat: gameState.isPlaying ? Infinity : 0 }
                  }}
                >
                  {/* Coin Shadow */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-md"></div>
                  
                  {/* Coin Body */}
                  <div className="w-full h-full rounded-full relative transform-gpu preserve-3d">
                    {/* Heads Side */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--gold)] via-[var(--gold-glow)] to-[var(--gold)] flex items-center justify-center text-6xl font-bold text-black shadow-2xl backface-hidden">
                      <Crown className="w-20 h-20" />
                    </div>
                    
                    {/* Tails Side */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--silver)] via-white to-[var(--silver)] flex items-center justify-center text-6xl font-bold text-black shadow-2xl backface-hidden transform rotateY-180">
                      <Gem className="w-20 h-20" />
                    </div>
                    
                    {/* Coin Edge */}
                    <div className="absolute inset-2 rounded-full border-4 border-[var(--gold)] opacity-50"></div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-[var(--gold-glow)] blur-xl opacity-30 animate-pulse-glow"></div>
                </motion.div>
              </div>

              {/* Game Controls */}
              <div className="space-y-8">
                {/* Bet Amount */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-[var(--text-primary)]">
                    Bet Amount (SOL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={state.betAmount}
                      onChange={(e) => setState(prev => ({ ...prev, betAmount: e.target.value }))}
                      className="w-full px-6 py-4 text-2xl font-bold bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--accent)] focus:outline-none transition-all duration-300 text-center"
                      min="0.01"
                      step="0.01"
                      disabled={gameState.isPlaying}
                    />
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] font-bold">
                      SOL
                    </div>
                  </div>
                  
                  {/* Quick Bet Buttons */}
                  <div className="grid grid-cols-5 gap-3">
                    {[0.01, 0.1, 0.5, 1, 5].map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setState(prev => ({ ...prev, betAmount: amount.toString() }))}
                        className="py-3 px-4 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all duration-300 font-bold"
                        disabled={gameState.isPlaying}
                      >
                        {amount}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Prediction Selection */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-[var(--text-primary)]">
                    Choose Your Side
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setState(prev => ({ ...prev, prediction: 'heads' }))}
                      className={`relative py-8 px-6 rounded-2xl font-bold text-xl transition-all duration-300 overflow-hidden ${
                        state.prediction === 'heads'
                          ? 'bg-gradient-to-br from-[var(--gold)] to-[var(--gold-glow)] text-black shadow-2xl glow-effect'
                          : 'bg-[var(--card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                      disabled={gameState.isPlaying}
                    >
                      <Crown className="w-12 h-12 mx-auto mb-3" />
                      <div>HEADS</div>
                      <div className="text-sm opacity-75">Royal Side</div>
                      {state.prediction === 'heads' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setState(prev => ({ ...prev, prediction: 'tails' }))}
                      className={`relative py-8 px-6 rounded-2xl font-bold text-xl transition-all duration-300 overflow-hidden ${
                        state.prediction === 'tails'
                          ? 'bg-gradient-to-br from-[var(--silver)] to-white text-black shadow-2xl glow-effect'
                          : 'bg-[var(--card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                      disabled={gameState.isPlaying}
                    >
                      <Gem className="w-12 h-12 mx-auto mb-3" />
                      <div>TAILS</div>
                      <div className="text-sm opacity-75">Diamond Side</div>
                      {state.prediction === 'tails' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Flip Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFlip}
                  disabled={!isConnected || gameState.isPlaying}
                  className="w-full py-6 px-8 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] hover:from-[var(--accent-hover)] hover:to-[var(--secondary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-2xl transition-all duration-300 shadow-2xl glow-effect relative overflow-hidden"
                >
                  {gameState.isPlaying ? (
                    <div className="flex items-center justify-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                      />
                      <span>FLIPPING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Zap className="w-8 h-8" />
                      <span>FLIP COIN</span>
                      <Target className="w-8 h-8" />
                    </div>
                  )}
                  
                  {!gameState.isPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-[var(--accent)]" />
                Live Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Balance</span>
                  <span className="font-bold text-[var(--accent)]">
                    {balance?.toFixed(4) || '0.0000'} SOL
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Potential Win</span>
                  <span className="font-bold text-[var(--success)]">
                    {(parseFloat(state.betAmount || '0') * state.multiplier).toFixed(4)} SOL
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Win Rate</span>
                  <span className="font-bold">{gameStats.winRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Games Played</span>
                  <span className="font-bold">{gameStats.totalGames}</span>
                </div>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-[var(--accent)]" />
                Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Sound Effects</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      soundEnabled 
                        ? 'bg-[var(--accent)] text-white' 
                        : 'bg-[var(--card-hover)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Recent Games */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <History className="w-6 h-6 mr-2 text-[var(--accent)]" />
                Recent Games
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {gameHistory.slice(0, 5).map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--background-secondary)]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {game.result.outcome === 'heads' ? '👑' : '💎'}
                      </div>
                      <div>
                        <div className="font-medium">{game.betAmount} SOL</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {new Date(game.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${game.won ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                      {game.won ? `+${game.payout.toFixed(4)}` : `-${game.betAmount.toFixed(4)}`}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraCoinFlip;
