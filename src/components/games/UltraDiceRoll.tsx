import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Dice6,
  Target, TrendingUp, Zap, Settings, History,
  Volume2, VolumeX, Flame
} from 'lucide-react';
import { useEnhancedGame } from '../../hooks/useEnhancedGame';

interface DiceState {
  betAmount: string;
  targetNumber: number;
  isOver: boolean;
  isRolling: boolean;
  diceValue: number;
  multiplier: number;
  winChance: number;
}

const UltraDiceRoll: React.FC = () => {
  const [state, setState] = useState<DiceState>({
    betAmount: '0.1',
    targetNumber: 50,
    isOver: true,
    isRolling: false,
    diceValue: 1,
    multiplier: 1.98,
    winChance: 49.5,
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
  } = useEnhancedGame('diceroll');

  const diceRef = useRef<HTMLDivElement>(null);

  // Calculate multiplier and win chance based on target
  useEffect(() => {
    const chance = state.isOver ? (100 - state.targetNumber) : state.targetNumber;
    const multiplier = chance > 0 ? (98 / chance) : 0;
    
    setState(prev => ({
      ...prev,
      winChance: chance,
      multiplier: Math.min(multiplier, 9.9) // Cap at 9.9x
    }));
  }, [state.targetNumber, state.isOver]);

  // Handle dice roll
  const handleRoll = useCallback(async () => {
    if (!isConnected || gameState.isPlaying) return;

    setState(prev => ({ ...prev, isRolling: true }));

    try {
      // Animate dice rolling
      const rollDuration = 2000;
      const rollInterval = 100;
      let currentTime = 0;

      const rollAnimation = setInterval(() => {
        setState(prev => ({ 
          ...prev, 
          diceValue: Math.floor(Math.random() * 100) + 1 
        }));
        
        currentTime += rollInterval;
        if (currentTime >= rollDuration) {
          clearInterval(rollAnimation);
        }
      }, rollInterval);

      const prediction = {
        target: state.targetNumber,
        isOver: state.isOver
      };

      await placeBet(parseFloat(state.betAmount), prediction);
    } catch (error) {
      console.error('Roll failed:', error);
    } finally {
      setState(prev => ({ ...prev, isRolling: false }));
    }
  }, [isConnected, gameState.isPlaying, state.betAmount, state.targetNumber, state.isOver, placeBet]);

  // Update dice value from game result
  useEffect(() => {
    const outcome = gameState.result?.outcome;
    if (typeof outcome !== 'number') return;

    setState((prev) => ({ ...prev, diceValue: outcome }));
  }, [gameState.result]);

  const getDiceColor = (value: number) => {
    if (value <= 10) return 'from-red-500 to-red-600';
    if (value <= 25) return 'from-orange-500 to-orange-600';
    if (value <= 50) return 'from-yellow-500 to-yellow-600';
    if (value <= 75) return 'from-green-500 to-green-600';
    if (value <= 90) return 'from-blue-500 to-blue-600';
    return 'from-purple-500 to-purple-600';
  };

  const isWinningRoll = (value: number) => {
    return state.isOver ? value > state.targetNumber : value < state.targetNumber;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent-glow)] rounded-full blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[var(--secondary-glow)] rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
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
              animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <Dice6 className="w-12 h-12 text-[var(--accent)]" />
            </motion.div>
            <h1 className="text-6xl font-black gradient-text">
              ULTRA DICE ROLL
            </h1>
            <motion.div
              animate={{ rotateX: [360, 0], rotateY: [360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="ml-4"
            >
              <Target className="w-12 h-12 text-[var(--secondary)]" />
            </motion.div>
          </div>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Roll the dice and predict if the result will be over or under your target number. 
            Higher risk, higher rewards!
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
              {/* 3D Dice Display */}
              <div className="flex justify-center mb-12">
                <motion.div
                  ref={diceRef}
                  className="relative"
                  animate={{
                    rotateX: state.isRolling ? [0, 360, 720, 1080] : 0,
                    rotateY: state.isRolling ? [0, 360, 720, 1080] : 0,
                    scale: state.isRolling ? [1, 1.2, 1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: state.isRolling ? 2 : 0.5,
                    ease: "easeOut"
                  }}
                >
                  {/* Dice Shadow */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-black/20 rounded-full blur-lg"></div>
                  
                  {/* Main Dice */}
                  <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${getDiceColor(state.diceValue)} shadow-2xl flex items-center justify-center relative overflow-hidden`}>
                    {/* Dice Value */}
                    <div className="text-4xl font-black text-white z-10">
                      {state.diceValue}
                    </div>
                    
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                      animate={state.isRolling ? { rotate: [0, 360] } : {}}
                      transition={{ duration: 0.5, repeat: state.isRolling ? Infinity : 0 }}
                    />
                    
                    {/* Winning Glow */}
                    {gameState.result && isWinningRoll(state.diceValue) && (
                      <motion.div
                        className="absolute inset-0 bg-[var(--success-glow)] rounded-2xl"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1, repeat: 3 }}
                      />
                    )}
                  </div>

                  {/* Particle Effects */}
                  {state.isRolling && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-[var(--accent)] rounded-full"
                          initial={{ 
                            x: 64, 
                            y: 64, 
                            scale: 0 
                          }}
                          animate={{
                            x: 64 + Math.cos(i * 45 * Math.PI / 180) * 100,
                            y: 64 + Math.sin(i * 45 * Math.PI / 180) * 100,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
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
                </div>

                {/* Target Number Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold">Target Number</label>
                    <div className="text-2xl font-bold text-[var(--accent)]">
                      {state.targetNumber}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="2"
                      max="98"
                      value={state.targetNumber}
                      onChange={(e) => setState(prev => ({ ...prev, targetNumber: parseInt(e.target.value) }))}
                      className="w-full h-3 bg-[var(--card)] rounded-lg appearance-none cursor-pointer slider"
                      disabled={gameState.isPlaying}
                    />
                    <div 
                      className="absolute top-0 h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-lg pointer-events-none"
                      style={{ width: `${state.targetNumber}%` }}
                    />
                  </div>
                </div>

                {/* Over/Under Selection */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold">Prediction</label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setState(prev => ({ ...prev, isOver: false }))}
                      className={`py-6 px-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
                        !state.isOver
                          ? 'bg-gradient-to-br from-[var(--error)] to-[var(--error-glow)] text-white shadow-2xl'
                          : 'bg-[var(--card-hover)] text-[var(--text-secondary)]'
                      }`}
                      disabled={gameState.isPlaying}
                    >
                      <div className="text-3xl mb-2">📉</div>
                      <div>UNDER {state.targetNumber}</div>
                      <div className="text-sm opacity-75">{state.isOver ? 0 : state.winChance.toFixed(1)}% chance</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setState(prev => ({ ...prev, isOver: true }))}
                      className={`py-6 px-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
                        state.isOver
                          ? 'bg-gradient-to-br from-[var(--success)] to-[var(--success-glow)] text-white shadow-2xl'
                          : 'bg-[var(--card-hover)] text-[var(--text-secondary)]'
                      }`}
                      disabled={gameState.isPlaying}
                    >
                      <div className="text-3xl mb-2">📈</div>
                      <div>OVER {state.targetNumber}</div>
                      <div className="text-sm opacity-75">{state.isOver ? state.winChance.toFixed(1) : 0}% chance</div>
                    </motion.button>
                  </div>
                </div>

                {/* Multiplier Display */}
                <div className="bg-[var(--card-hover)] rounded-2xl p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-[var(--text-secondary)]">Multiplier</div>
                      <div className="text-3xl font-bold text-[var(--accent)]">
                        {state.multiplier.toFixed(2)}x
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-secondary)]">Win Chance</div>
                      <div className="text-3xl font-bold text-[var(--success)]">
                        {state.winChance.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-secondary)]">Potential Win</div>
                      <div className="text-3xl font-bold text-[var(--gold)]">
                        {(parseFloat(state.betAmount || '0') * state.multiplier).toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roll Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRoll}
                  disabled={!isConnected || gameState.isPlaying}
                  className="w-full py-6 px-8 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] hover:from-[var(--accent-hover)] hover:to-[var(--secondary-hover)] disabled:opacity-50 text-white font-black text-2xl transition-all duration-300 shadow-2xl glow-effect relative overflow-hidden"
                >
                  {gameState.isPlaying ? (
                    <div className="flex items-center justify-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Dice6 className="w-8 h-8" />
                      </motion.div>
                      <span>ROLLING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Zap className="w-8 h-8" />
                      <span>ROLL DICE</span>
                      <Flame className="w-8 h-8" />
                    </div>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Stats */}
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
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Balance</span>
                  <span className="font-bold text-[var(--accent)]">
                    {balance?.toFixed(4) || '0.0000'} SOL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Games Played</span>
                  <span className="font-bold">{gameStats.totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Win Rate</span>
                  <span className="font-bold">{gameStats.winRate.toFixed(1)}%</span>
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
              transition={{ delay: 0.1 }}
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

            {/* Recent Games */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <History className="w-6 h-6 mr-2 text-[var(--accent)]" />
                Recent Rolls
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {gameHistory.slice(0, 5).map((game, index) => {
                  const rolled = typeof game.result.outcome === 'number' ? game.result.outcome : 1;

                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--background-secondary)]"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getDiceColor(rolled)} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {rolled}
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
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraDiceRoll;
