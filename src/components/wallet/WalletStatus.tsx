import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Wallet, ExternalLink, Copy, Check } from 'lucide-react';

const WalletStatus: React.FC = () => {
  const { publicKey, wallet, disconnect } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      try {
        const lamports = await connection.getBalance(publicKey);
        if (isMounted) {
          setBalance(lamports / LAMPORTS_PER_SOL);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        if (isMounted) {
          setBalance(null);
        }
      }
    };

    getBalance();
    const intervalId = setInterval(getBalance, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [publicKey, connection]);

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const explorerUrl = publicKey 
    ? `https://explorer.solana.com/address/${publicKey.toString()}` 
    : '';

  if (!publicKey) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--card)] transition-colors"
      >
        <Wallet className="w-4 h-4 text-[var(--accent)]" />
        <span>{formatAddress(publicKey.toString())}</span>
        {balance !== null && (
          <span className="font-medium">{balance.toFixed(2)} SOL</span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full mt-1 right-0 w-64 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50">
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--text-secondary)]">Connected to</span>
              <span className="font-medium">{wallet?.adapter.name}</span>
            </div>

            <div className="space-y-1">
              <span className="text-sm text-[var(--text-secondary)]">Address</span>
              <div className="flex items-center justify-between">
                <span className="text-sm">{formatAddress(publicKey.toString())}</span>
                <button 
                  onClick={handleCopyAddress}
                  className="p-1 rounded-md hover:bg-[var(--card-hover)]"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-sm text-[var(--text-secondary)]">Balance</span>
              <div className="font-medium">
                {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-[var(--accent)] hover:underline"
              >
                <span>View on Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletStatus;
