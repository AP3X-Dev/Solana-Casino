import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Crown, Gem, Star, Cherry, Coins, 
  Volume2, VolumeX, Settings, TrendingUp,
  Trophy, Flame, Sparkles, Diamond
} from 'lucide-react';
import { useEnhancedGame } from '../../hooks/useEnhancedGame';

interface SlotSymbol {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  multiplier: number;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface SlotsState {
  betAmount: string;
  isSpinning: boolean;
  reels: number[][];
  currentSymbols: number[];
  autoSpin: boolean;
  autoSpinCount: number;
  jackpotMode: boolean;
}

const SLOT_SYMBOLS: SlotSymbol[] = [
  { id: 'cherry', icon: Cherry, name: 'Cherry', multiplier: 2, color: 'text-red-500', rarity: 'common' },
  { id: 'coin', icon: Coins, name: 'Coin', multiplier: 3, color: 'text-yellow-500', rarity: 'common' },
  { id: 'star', icon: Star, name: 'Star', multiplier: 5, color: 'text-blue-500', rarity: 'rare' },
  { id: 'gem', icon: Gem, name: 'Gem', multiplier: 8, color: 'text-purple-500', rarity: 'rare' },
  { id: 'diamond', icon: Diamond, name: 'Diamond', multiplier: 15, color: 'text-cyan-500', rarity: 'epic' },
  { id: 'crown', icon: Crown, name: 'Crown', multiplier: 25, color: 'text-yellow-400', rarity: 'legendary' },
  { id: 'jackpot', icon: Trophy, name: 'Jackpot', multiplier: 100, color: 'text-gradient', rarity: 'legendary' },
];

const UltraSlots: React.FC = () => {
  const [state, setState] = useState<SlotsState>({
    betAmount: '0.1',
    isSpinning: false,
    reels: [
      [0, 1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 0],
      [2, 3, 4, 5, 6, 0, 1],
    ],
    currentSymbols: [0, 1, 2],
    autoSpin: false,
    autoSpinCount: 0,
    jackpotMode: false,
  });

  const {
    gameState,
    gameStats,
    balance,
    isConnected,
    soundEnabled,
    placeBet,
    setSoundEnabled,
  } = useEnhancedGame('slots');

  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle spin
  const handleSpin = useCallback(async () => {
    if (!isConnected || gameState.isPlaying) return;

    setState(prev => ({ ...prev, isSpinning: true }));

    try {
      // Animate reels spinning
      const spinDuration = 2000 + Math.random() * 1000; // 2-3 seconds
      
      // Start reel animations with staggered timing
      reelRefs.current.forEach((reel, index) => {
        if (reel) {
          const delay = index * 200;
          setTimeout(() => {
            reel.style.animation = `slot-spin ${spinDuration - delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          }, delay);
        }
      });

      const prediction = { reels: 3 }; // Simple prediction for slots
      await placeBet(parseFloat(state.betAmount), prediction);

    } catch (error) {
      console.error('Spin failed:', error);
    } finally {
      setTimeout(() => {
        setState(prev => ({ ...prev, isSpinning: false }));
        // Reset reel animations
        reelRefs.current.forEach(reel => {
          if (reel) reel.style.animation = '';
        });
      }, 3000);
    }
  }, [isConnected, gameState.isPlaying, state.betAmount, placeBet]);

  // Update symbols from game result
  useEffect(() => {
    const outcome = gameState.result?.outcome;
    if (!outcome || !Array.isArray(outcome)) return;

    const newSymbols = (outcome as number[]).slice(0, 3);
    setState(prev => ({ ...prev, currentSymbols: newSymbols }));

    // Check for jackpot
    const isJackpot = newSymbols.every((symbol) => symbol === 6); // All jackpot symbols
    if (isJackpot) {
      setState(prev => ({ ...prev, jackpotMode: true }));
      setTimeout(() => {
        setState(prev => ({ ...prev, jackpotMode: false }));
      }, 5000);
    }
  }, [gameState.result]);

  const getSymbolRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'drop-shadow-lg filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      case 'epic': return 'drop-shadow-lg filter drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]';
      case 'legendary': return 'drop-shadow-lg filter drop-shadow-[0_0_16px_rgba(255,215,0,0.8)]';
      default: return '';
    }
  };

  const calculateWinnings = () => {
    const symbols = state.currentSymbols.map(index => SLOT_SYMBOLS[index]);
    const betAmount = parseFloat(state.betAmount || '0');
    
    // Check for three of a kind
    if (symbols[0].id === symbols[1].id && symbols[1].id === symbols[2].id) {
      return betAmount * symbols[0].multiplier;
    }
    
    // Check for two of a kind
    if (symbols[0].id === symbols[1].id || symbols[1].id === symbols[2].id || symbols[0].id === symbols[2].id) {
      const matchingSymbol = symbols[0].id === symbols[1].id ? symbols[0] : 
                           symbols[1].id === symbols[2].id ? symbols[1] : symbols[0];
      return betAmount * (matchingSymbol.multiplier * 0.5);
    }
    
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] p-6 relative overflow-hidden">
      {/* Jackpot Mode Overlay */}
      <AnimatePresence>
        {state.jackpotMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-yellow-500/20 via-red-500/20 to-purple-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                  filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl font-black gradient-text mb-4"
              >
                🎰 JACKPOT! 🎰
              </motion.div>
              <div className="text-4xl font-bold text-[var(--gold)]">
                MASSIVE WIN!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[var(--gold-glow)] rounded-full blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[var(--accent-glow)] rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[var(--secondary-glow)] rounded-full blur-3xl opacity-5 animate-pulse-glow"></div>
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <Sparkles className="w-12 h-12 text-[var(--gold)]" />
            </motion.div>
            <h1 className="text-6xl font-black gradient-text">
              ULTRA SLOTS
            </h1>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="ml-4"
            >
              <Trophy className="w-12 h-12 text-[var(--gold)]" />
            </motion.div>
          </div>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Spin the ultimate slot machine with legendary symbols, massive multipliers, 
            and life-changing jackpots!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="xl:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Slot Machine */}
              <div className="relative mb-12">
                {/* Machine Frame */}
                <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-[var(--gold)] relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-[var(--gold)] rounded-full animate-pulse-glow"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--gold)] rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[var(--gold)] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-[var(--gold)] rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

                  {/* Reels Container */}
                  <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
                    <div className="grid grid-cols-3 gap-4">
                      {[0, 1, 2].map((reelIndex) => (
                        <div key={reelIndex} className="relative">
                          {/* Reel Frame */}
                          <div className="bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl p-2 shadow-inner">
                            <div 
                              ref={el => reelRefs.current[reelIndex] = el}
                              className="bg-white rounded-lg h-32 flex items-center justify-center relative overflow-hidden"
                            >
                              {/* Current Symbol */}
                              <motion.div
                                key={`${reelIndex}-${state.currentSymbols[reelIndex]}`}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`text-6xl ${getSymbolRarityGlow(SLOT_SYMBOLS[state.currentSymbols[reelIndex]]?.rarity || 'common')}`}
                              >
                                {React.createElement(
                                  SLOT_SYMBOLS[state.currentSymbols[reelIndex]]?.icon || Star,
                                  { 
                                    className: `w-16 h-16 ${SLOT_SYMBOLS[state.currentSymbols[reelIndex]]?.color || 'text-gray-500'}` 
                                  }
                                )}
                              </motion.div>

                              {/* Spinning Effect */}
                              {state.isSpinning && (
                                <div className="absolute inset-0 flex flex-col justify-center items-center">
                                  {SLOT_SYMBOLS.map((symbol, index) => (
                                    <motion.div
                                      key={index}
                                      className="absolute"
                                      animate={{ y: ['-100%', '100%'] }}
                                      transition={{
                                        duration: 0.1,
                                        repeat: Infinity,
                                        delay: index * 0.05,
                                        ease: "linear"
                                      }}
                                    >
                                      {React.createElement(symbol.icon, { 
                                        className: `w-12 h-12 ${symbol.color}` 
                                      })}
                                    </motion.div>
                                  ))}
                                </div>
                              )}

                              {/* Win Glow Effect */}
                              {gameState.result && calculateWinnings() > 0 && (
                                <motion.div
                                  className="absolute inset-0 bg-[var(--gold-glow)] rounded-lg"
                                  animate={{ opacity: [0, 0.3, 0] }}
                                  transition={{ duration: 0.5, repeat: 5 }}
                                />
                              )}
                            </div>
                          </div>

                          {/* Reel Label */}
                          <div className="text-center mt-2 text-sm text-[var(--text-secondary)]">
                            REEL {reelIndex + 1}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Win Line */}
                    {gameState.result && calculateWinnings() > 0 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute top-1/2 left-6 right-6 h-1 bg-[var(--gold)] rounded-full transform -translate-y-1/2"
                      />
                    )}
                  </div>

                  {/* Jackpot Display */}
                  <div className="mt-6 text-center">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">JACKPOT</div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        textShadow: [
                          '0 0 10px rgba(255, 215, 0, 0.5)',
                          '0 0 20px rgba(255, 215, 0, 0.8)',
                          '0 0 10px rgba(255, 215, 0, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl font-black text-[var(--gold)]"
                    >
                      {(balance ? balance * 100 : 1000).toFixed(2)} SOL
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Game Controls */}
              <div className="space-y-8">
                {/* Bet Amount */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold">Bet Amount (SOL)</label>
                  <input
                    type="number"
                    value={state.betAmount}
                    onChange={(e) => setState(prev => ({ ...prev, betAmount: e.target.value }))}
                    className="w-full px-6 py-4 text-2xl font-bold bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--accent)] focus:outline-none transition-all text-center"
                    min="0.01"
                    step="0.01"
                    disabled={gameState.isPlaying}
                  />
                  
                  {/* Quick Bet Buttons */}
                  <div className="grid grid-cols-4 gap-3">
                    {[0.1, 0.5, 1, 5].map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setState(prev => ({ ...prev, betAmount: amount.toString() }))}
                        className="py-3 px-4 rounded-xl bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-all font-bold"
                        disabled={gameState.isPlaying}
                      >
                        {amount}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Spin Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSpin}
                  disabled={!isConnected || gameState.isPlaying}
                  className="w-full py-6 px-8 rounded-2xl bg-gradient-to-r from-[var(--gold)] via-[var(--gold-glow)] to-[var(--gold)] hover:from-[var(--gold-glow)] hover:to-[var(--gold)] disabled:opacity-50 text-black font-black text-2xl transition-all duration-300 shadow-2xl relative overflow-hidden"
                >
                  {gameState.isPlaying ? (
                    <div className="flex items-center justify-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-8 h-8" />
                      </motion.div>
                      <span>SPINNING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Zap className="w-8 h-8" />
                      <span>SPIN TO WIN</span>
                      <Flame className="w-8 h-8" />
                    </div>
                  )}
                  
                  {!gameState.isPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Paytable */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-[var(--gold)]" />
                Paytable
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {SLOT_SYMBOLS.map((symbol) => (
                  <div key={symbol.id} className="flex items-center justify-between p-2 rounded-lg bg-[var(--background-secondary)]">
                    <div className="flex items-center space-x-3">
                      {React.createElement(symbol.icon, { 
                        className: `w-6 h-6 ${symbol.color}` 
                      })}
                      <span className="font-medium">{symbol.name}</span>
                    </div>
                    <div className="font-bold text-[var(--gold)]">
                      {symbol.multiplier}x
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-[var(--accent)]" />
                Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Balance</span>
                  <span className="font-bold text-[var(--accent)]">
                    {balance?.toFixed(4) || '0.0000'} SOL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Potential Win</span>
                  <span className="font-bold text-[var(--gold)]">
                    {calculateWinnings().toFixed(4)} SOL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Spins</span>
                  <span className="font-bold">{gameStats.totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Biggest Win</span>
                  <span className="font-bold text-[var(--gold)]">
                    {gameStats.biggestWin.toFixed(4)} SOL
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-[var(--accent)]" />
                Settings
              </h3>
              <div className="flex items-center justify-between">
                <span>Sound Effects</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-3 rounded-xl transition-all ${
                    soundEnabled 
                      ? 'bg-[var(--accent)] text-white' 
                      : 'bg-[var(--card-hover)]'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraSlots;
