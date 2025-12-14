import SHA256 from 'crypto-js/sha256';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProvablyFairGameType = 'coinflip' | 'diceroll' | 'slots';

export interface ProvableFairData {
  clientSeed: string;
  serverSeedHash: string;
  serverSeed: string;
  nonce: number;
}

interface ProvableFairnessState {
  clientSeed: string;
  setClientSeed: (seed: string) => void;
  serverSeed: string;
  serverSeedHash: string;
  rotateServerSeed: () => void;
  nonce: number;
  nextNonce: () => number;
}

export function hashServerSeed(serverSeed: string): string {
  return SHA256(serverSeed).toString();
}

function randomString(length: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = new Uint8Array(length);

  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Secure RNG unavailable (crypto.getRandomValues missing)');
  }

  globalThis.crypto.getRandomValues(bytes);

  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += alphabet[bytes[i] % alphabet.length];
  }

  return result;
}

function deriveUint32(serverSeed: string, clientSeed: string, nonce: number, salt: string): number {
  const combinedSeed = `${serverSeed}-${clientSeed}-${nonce}-${salt}`;
  const hash = SHA256(combinedSeed).toString();
  return Number.parseInt(hash.slice(0, 8), 16);
}

export function generateCoinFlipResult(
  serverSeed: string,
  clientSeed: string,
  nonce: number
): 'heads' | 'tails' {
  return deriveUint32(serverSeed, clientSeed, nonce, 'coinflip') % 2 === 0 ? 'heads' : 'tails';
}

export function generateDiceRollResult(serverSeed: string, clientSeed: string, nonce: number): number {
  return (deriveUint32(serverSeed, clientSeed, nonce, 'diceroll') % 100) + 1;
}

export function generateSlotsResult(
  serverSeed: string,
  clientSeed: string,
  nonce: number
): [number, number, number] {
  const reel0 = deriveUint32(serverSeed, clientSeed, nonce, 'slots-0') % 7;
  const reel1 = deriveUint32(serverSeed, clientSeed, nonce, 'slots-1') % 7;
  const reel2 = deriveUint32(serverSeed, clientSeed, nonce, 'slots-2') % 7;
  return [reel0, reel1, reel2];
}

export function verifyResult(
  gameType: ProvablyFairGameType,
  serverSeed: string,
  clientSeed: string,
  nonce: number,
  expectedResult: 'heads' | 'tails' | number | [number, number, number]
): boolean {
  switch (gameType) {
    case 'coinflip':
      return generateCoinFlipResult(serverSeed, clientSeed, nonce) === expectedResult;
    case 'diceroll':
      return generateDiceRollResult(serverSeed, clientSeed, nonce) === expectedResult;
    case 'slots': {
      const actual = generateSlotsResult(serverSeed, clientSeed, nonce);
      return (
        Array.isArray(expectedResult) &&
        expectedResult.length === 3 &&
        actual[0] === expectedResult[0] &&
        actual[1] === expectedResult[1] &&
        actual[2] === expectedResult[2]
      );
    }
    default:
      return false;
  }
}

export const useProvableFairnessStore = create<ProvableFairnessState>()(
  persist(
    (set, get) => {
      const initialServerSeed = randomString(32);

      return {
        clientSeed: randomString(16),
        setClientSeed: (seed: string) => set({ clientSeed: seed }),

        serverSeed: initialServerSeed,
        serverSeedHash: hashServerSeed(initialServerSeed),
        rotateServerSeed: () => {
          const nextSeed = randomString(32);
          set({ serverSeed: nextSeed, serverSeedHash: hashServerSeed(nextSeed), nonce: 0 });
        },

        nonce: 0,
        nextNonce: () => {
          const current = get().nonce;
          set({ nonce: current + 1 });
          return current;
        },
      };
    },
    {
      name: 'provable-fairness-storage',
      partialize: (state) => ({ clientSeed: state.clientSeed }),
    }
  )
);

