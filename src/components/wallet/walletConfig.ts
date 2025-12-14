import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Network options
export const NETWORKS = {
  mainnet: {
    name: 'Mainnet Beta',
    endpoint: 'https://api.mainnet-beta.solana.com',
    active: true,
  },
  devnet: {
    name: 'Devnet',
    endpoint: 'https://api.devnet.solana.com',
    active: true,
  },
  testnet: {
    name: 'Testnet',
    endpoint: 'https://api.testnet.solana.com',
    active: true,
  },
  localnet: {
    name: 'Localnet',
    endpoint: 'http://localhost:8899',
    active: false,
  },
} as const;

export type NetworkKey = keyof typeof NETWORKS;

interface WalletSettingsState {
  network: NetworkKey;
  setNetwork: (network: NetworkKey) => void;
  autoConnect: boolean;
  setAutoConnect: (autoConnect: boolean) => void;
}

export const useWalletSettings = create<WalletSettingsState>()(
  persist(
    (set) => ({
      network: 'mainnet',
      setNetwork: (network) => set({ network }),
      autoConnect: true,
      setAutoConnect: (autoConnect) => set({ autoConnect }),
    }),
    {
      name: 'wallet-settings',
      partialize: (state) => ({ network: state.network, autoConnect: state.autoConnect }),
    }
  )
);

