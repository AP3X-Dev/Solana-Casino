import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { NETWORKS, useWalletSettings, type NetworkKey } from './walletConfig';
import { ChevronDown, Check, Wifi, WifiOff } from 'lucide-react';
import { cn } from '../../utils/cn';

const NetworkSelector: React.FC = () => {
  const { network, setNetwork } = useWalletSettings();
  const { connected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  const activeNetworks = (Object.keys(NETWORKS) as NetworkKey[])
    .filter((key) => NETWORKS[key].active)
    .map((key) => ({ key, ...NETWORKS[key] }));

  const currentNetwork = NETWORKS[network];

  const handleNetworkChange = (networkKey: NetworkKey) => {
    setNetwork(networkKey);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors",
          connected ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400",
          "hover:bg-[var(--card)] focus:outline-none"
        )}
      >
        {connected ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        <span>{currentNetwork?.name || 'Unknown Network'}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 w-48 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50">
          <div className="py-1">
            {activeNetworks.map((networkConfig) => (
              <button
                key={networkConfig.key}
                onClick={() => handleNetworkChange(networkConfig.key)}
                className={cn(
                  "flex items-center w-full px-4 py-2 text-left hover:bg-[var(--card-hover)]",
                  network === networkConfig.key ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                )}
              >
                <span className="flex-1">{networkConfig.name}</span>
                {network === networkConfig.key && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;
