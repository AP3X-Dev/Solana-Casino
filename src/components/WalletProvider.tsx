import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { NETWORKS, useWalletSettings } from './wallet/walletConfig';

const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { network, autoConnect } = useWalletSettings();
  const endpoint = NETWORKS[network as keyof typeof NETWORKS]?.endpoint || NETWORKS.mainnet.endpoint;

  // Initialize Phantom wallet
  const wallets = useMemo(() => [
    new PhantomWalletAdapter()
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export { WalletProvider };
