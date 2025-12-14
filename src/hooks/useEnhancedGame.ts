import { useState, useCallback, useEffect, useRef } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  generateCoinFlipResult,
  generateDiceRollResult,
  generateSlotsResult,
  useProvableFairnessStore,
  type ProvableFairData,
  type ProvablyFairGameType,
} from '../utils/provableFairness';

// Types
type CoinFlipPrediction = { choice: 'heads' | 'tails' };
type DiceRollPrediction = { target: number; isOver: boolean };
type SlotsPrediction = { reels: number };

type GamePrediction = CoinFlipPrediction | DiceRollPrediction | SlotsPrediction;
type GameOutcome = 'heads' | 'tails' | number | [number, number, number];

interface GameResult {
  outcome: GameOutcome;
  won: boolean;
  payout: number;
}

interface GameState {
  isPlaying: boolean;
  result: GameResult | null;
  isAnimating: boolean;
  gameId: string | null;
  transactionSignature: string | null;
  error: string | null;
  startTime: number | null;
  endTime: number | null;
}

interface GameHistory {
  id: string;
  gameType: ProvablyFairGameType;
  betAmount: number;
  prediction: GamePrediction;
  result: GameResult;
  won: boolean;
  payout: number;
  timestamp: number;
  transactionSignature: string;
  provableFairData: ProvableFairData;
}

interface GameStats {
  totalGames: number;
  wins: number;
  totalWagered: number;
  totalWon: number;
  biggestWin: number;
  currentStreak: number;
  bestStreak: number;
  winRate: number;
  profitLoss: number;
}

interface GameSlice {
  gameState: GameState;
  gameHistory: GameHistory[];
  gameStats: GameStats;
}

const EMPTY_GAME_STATE: GameState = {
  isPlaying: false,
  result: null,
  isAnimating: false,
  gameId: null,
  transactionSignature: null,
  error: null,
  startTime: null,
  endTime: null,
};

const EMPTY_GAME_STATS: GameStats = {
  totalGames: 0,
  wins: 0,
  totalWagered: 0,
  totalWon: 0,
  biggestWin: 0,
  currentStreak: 0,
  bestStreak: 0,
  winRate: 0,
  profitLoss: 0,
};

const EMPTY_GAME_HISTORY: GameHistory[] = [];

const createEmptySlice = (): GameSlice => ({
  gameState: { ...EMPTY_GAME_STATE },
  gameHistory: [],
  gameStats: { ...EMPTY_GAME_STATS },
});

// Store for per-game state management
interface GameStore {
  games: Partial<Record<ProvablyFairGameType, GameSlice>>;
  setGameState: (gameType: ProvablyFairGameType, state: Partial<GameState>) => void;
  addGameToHistory: (gameType: ProvablyFairGameType, game: GameHistory) => void;
  updateGameStats: (gameType: ProvablyFairGameType, game: GameHistory) => void;
  clearHistory: (gameType: ProvablyFairGameType) => void;
  resetStats: (gameType: ProvablyFairGameType) => void;
}

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      games: {},

      setGameState: (gameType, state) =>
        set((prev) => {
          const slice = prev.games[gameType] ?? createEmptySlice();
          return {
            games: {
              ...prev.games,
              [gameType]: { ...slice, gameState: { ...slice.gameState, ...state } },
            },
          };
        }),

      addGameToHistory: (gameType, game) =>
        set((prev) => {
          const slice = prev.games[gameType] ?? createEmptySlice();
          return {
            games: {
              ...prev.games,
              [gameType]: { ...slice, gameHistory: [game, ...slice.gameHistory.slice(0, 99)] },
            },
          };
        }),

      updateGameStats: (gameType, game) =>
        set((prev) => {
          const slice = prev.games[gameType] ?? createEmptySlice();
          const stats: GameStats = { ...slice.gameStats };

          stats.totalGames += 1;
          stats.totalWagered += game.betAmount;

          if (game.won) {
            stats.wins += 1;
            stats.totalWon += game.payout;
            stats.currentStreak = stats.currentStreak >= 0 ? stats.currentStreak + 1 : 1;
            stats.biggestWin = Math.max(stats.biggestWin, game.payout);
          } else {
            stats.currentStreak = stats.currentStreak <= 0 ? stats.currentStreak - 1 : -1;
          }

          stats.bestStreak = Math.max(stats.bestStreak, Math.abs(stats.currentStreak));
          stats.winRate = stats.totalGames > 0 ? (stats.wins / stats.totalGames) * 100 : 0;
          stats.profitLoss = stats.totalWon - stats.totalWagered;

          return {
            games: {
              ...prev.games,
              [gameType]: { ...slice, gameStats: stats },
            },
          };
        }),

      clearHistory: (gameType) =>
        set((prev) => {
          const slice = prev.games[gameType] ?? createEmptySlice();
          return {
            games: {
              ...prev.games,
              [gameType]: { ...slice, gameHistory: [] },
            },
          };
        }),

      resetStats: (gameType) =>
        set((prev) => {
          const slice = prev.games[gameType] ?? createEmptySlice();
          return {
            games: {
              ...prev.games,
              [gameType]: { ...slice, gameStats: { ...EMPTY_GAME_STATS } },
            },
          };
        }),
    }),
    {
      name: 'game-store',
      partialize: (state) => ({ games: state.games }),
    }
  )
);

// Enhanced game hook
export const useEnhancedGame = (gameType: ProvablyFairGameType) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const gameState = useGameStore((state) => state.games[gameType]?.gameState ?? EMPTY_GAME_STATE);
  const gameHistory = useGameStore((state) => state.games[gameType]?.gameHistory ?? EMPTY_GAME_HISTORY);
  const gameStats = useGameStore((state) => state.games[gameType]?.gameStats ?? EMPTY_GAME_STATS);
  const setGameState = useGameStore((state) => state.setGameState);
  const addGameToHistory = useGameStore((state) => state.addGameToHistory);
  const updateGameStats = useGameStore((state) => state.updateGameStats);

  const clientSeed = useProvableFairnessStore((state) => state.clientSeed);
  const serverSeed = useProvableFairnessStore((state) => state.serverSeed);
  const serverSeedHash = useProvableFairnessStore((state) => state.serverSeedHash);
  const nextNonce = useProvableFairnessStore((state) => state.nextNonce);

  // Audio refs
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const loseSoundRef = useRef<HTMLAudioElement | null>(null);
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);

  const simulateGame = useCallback(
    (betAmount: number, prediction: GamePrediction, fair: ProvableFairData): GameResult => {
      switch (gameType) {
        case 'coinflip': {
          const coinPrediction = prediction as CoinFlipPrediction;
          const outcome = generateCoinFlipResult(fair.serverSeed, fair.clientSeed, fair.nonce);
          const won = outcome === coinPrediction.choice;
          return { outcome, won, payout: won ? betAmount * 1.95 : 0 };
        }
        case 'diceroll': {
          const dicePrediction = prediction as DiceRollPrediction;
          const outcome = generateDiceRollResult(fair.serverSeed, fair.clientSeed, fair.nonce);
          const won = dicePrediction.isOver ? outcome > dicePrediction.target : outcome < dicePrediction.target;
          const chance = dicePrediction.isOver ? 100 - dicePrediction.target : dicePrediction.target;
          const multiplier = chance > 0 ? 98 / chance : 0;
          return { outcome, won, payout: won ? betAmount * Math.min(multiplier, 9.9) : 0 };
        }
        case 'slots': {
          const outcome = generateSlotsResult(fair.serverSeed, fair.clientSeed, fair.nonce);
          const won = outcome[0] === outcome[1] && outcome[1] === outcome[2];
          const payout = won ? betAmount * (outcome[0] === 6 ? 100 : (outcome[0] + 1) * 5) : 0;
          return { outcome, won, payout };
        }
        default: {
          const exhaustiveCheck: never = gameType;
          throw new Error(`Unsupported game type: ${exhaustiveCheck}`);
        }
      }
    },
    [gameType]
  );

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      winSoundRef.current = new Audio('/sounds/win.mp3');
      loseSoundRef.current = new Audio('/sounds/lose.mp3');
      spinSoundRef.current = new Audio('/sounds/spin.mp3');

      // Preload audio files
      [winSoundRef.current, loseSoundRef.current, spinSoundRef.current].forEach(audio => {
        if (audio) {
          audio.preload = 'auto';
          audio.volume = 0.5;
        }
      });
    }
  }, []);

  // Simplified real-time updates (without WebSocket for now)
  useEffect(() => {
    // For now, we'll handle game updates locally
    // In production, this would connect to a real WebSocket server
    console.log('Game hook initialized for:', gameType);
  }, [gameType]);

  // Handle game result processing
  const processGameResult = useCallback((result: GameResult, betAmount: number, prediction: GamePrediction, gameId: string, fair: ProvableFairData) => {
    setGameState(gameType, {
      result,
      isAnimating: false,
      isPlaying: false,
      endTime: Date.now(),
    });

    // Play sound
    if (soundEnabled) {
      const audio = result.won ? winSoundRef.current : loseSoundRef.current;
      audio?.play().catch(console.error);
    }

    // Show notification
    if (result.won) {
      toast.success(`🎉 You won ${result.payout.toFixed(4)} SOL!`, {
        duration: 5000,
        icon: '🎰',
      });
    } else {
      toast.error('Better luck next time!', {
        duration: 3000,
      });
    }

    // Add to history and update stats
    const gameRecord: GameHistory = {
      id: gameId,
      gameType,
      betAmount,
      prediction,
      result,
      won: result.won,
      payout: result.payout,
      timestamp: Date.now(),
      transactionSignature: `simulated-tx-${gameId}`,
      provableFairData: fair,
    };

    addGameToHistory(gameType, gameRecord);
    updateGameStats(gameType, gameRecord);
  }, [gameType, soundEnabled, setGameState, addGameToHistory, updateGameStats]);

  // Fetch balance
  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null);
      return null;
    }

    try {
      const lamports = await connection.getBalance(publicKey);
      const solBalance = lamports / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      return solBalance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }, [connection, publicKey]);

  // Simplified bet placement with game simulation
  const placeBet = useCallback(async (
    amount: number,
    prediction: GamePrediction,
    options: {
      clientSeed?: string;
      autoPlay?: boolean;
      stopOnWin?: boolean;
      stopOnLoss?: boolean;
    } = {}
  ) => {
    if (!publicKey) {
      throw new Error('Wallet not connected');
    }

    if (gameState.isPlaying) {
      throw new Error('Game already in progress');
    }

    // Validate bet amount
    if (amount <= 0) {
      throw new Error('Bet amount must be greater than 0');
    }

    if (balance !== null && amount > balance) {
      throw new Error('Insufficient balance');
    }

    setIsLoading(true);
    const gameId = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

    setGameState(gameType, {
      isPlaying: true,
      isAnimating: true,
      result: null,
      error: null,
      startTime: Date.now(),
      gameId,
      transactionSignature: null,
    });

    try {
      // Play spin sound
      if (soundEnabled && spinSoundRef.current) {
        spinSoundRef.current.currentTime = 0;
        spinSoundRef.current.play().catch(console.error);
      }

      // Simulate game delay (1-3 seconds)
      const delay = 1000 + Math.random() * 2000;

      await new Promise(resolve => setTimeout(resolve, delay));

      const fair: ProvableFairData = {
        clientSeed: options.clientSeed ?? clientSeed,
        serverSeed,
        serverSeedHash,
        nonce: nextNonce(),
      };

      const result = simulateGame(amount, prediction, fair);

      // Process the result
      processGameResult(result, amount, prediction, gameId, fair);

      // Update balance (simulate)
      if (balance !== null) {
        const newBalance = balance - amount + result.payout;
        setBalance(newBalance);
      }

      return {
        signature: `simulated-tx-${gameId}`,
        gameId,
      };

    } catch (error: unknown) {
      console.error('Error placing bet:', error);
      const message = error instanceof Error ? error.message : 'Failed to place bet';

      setGameState(gameType, {
        isPlaying: false,
        isAnimating: false,
        error: message,
      });

      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, gameState.isPlaying, balance, gameType, soundEnabled, setGameState, clientSeed, serverSeed, serverSeedHash, nextNonce, simulateGame, processGameResult]);

  // Auto-play functionality (simplified)
  const startAutoPlay = useCallback(async (
    baseAmount: number,
    prediction: GamePrediction,
    options: {
      numberOfGames: number;
      stopOnWin?: number;
      stopOnLoss?: number;
      increaseOnWin?: number;
      increaseOnLoss?: number;
    }
  ) => {
    // Simplified auto-play - would be implemented in production
    void baseAmount;
    void prediction;
    void options;
    console.log('Auto-play feature coming soon!');
    toast('Auto-play feature coming soon!');
  }, []);

  // Initialize balance on mount and set default balance for demo
  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    let isCanceled = false;

    const load = async () => {
      const realBalance = await fetchBalance();
      if (!isCanceled && realBalance === null) setBalance(10);
    };

    load().catch(console.error);

    const intervalId = setInterval(() => {
      fetchBalance().catch(console.error);
    }, 30000);

    return () => {
      isCanceled = true;
      clearInterval(intervalId);
    };
  }, [fetchBalance, publicKey]);

  return {
    // State
    gameState,
    gameHistory,
    gameStats,
    balance,
    isLoading,
    isConnected: !!publicKey,
    soundEnabled,

    // Actions
    placeBet,
    startAutoPlay,
    fetchBalance,
    setSoundEnabled,

    // Utilities
    connection,
  };
};
