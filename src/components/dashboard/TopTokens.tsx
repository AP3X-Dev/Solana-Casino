import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface TokenItem {
  rank: number;
  name: string;
  volume: string;
  change: string;
  liquidity: string;
}

const tokens: TokenItem[] = [
  { rank: 1, name: 'BONK', volume: '123,456 SOL', change: '+12.5%', liquidity: 'Deep' },
  { rank: 2, name: 'WEN', volume: '98,765 SOL', change: '+8.3%', liquidity: 'Balanced' },
  { rank: 3, name: 'MYRO', volume: '45,678 SOL', change: '+5.7%', liquidity: 'Expanding' },
  { rank: 4, name: 'JUP', volume: '32,110 SOL', change: '+4.1%', liquidity: 'Growing' },
  { rank: 5, name: 'HNT', volume: '25,004 SOL', change: '+2.8%', liquidity: 'Stable' },
];

const TopTokens = () => (
  <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-lg shadow-black/10">
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Network velocity</p>
        <h2 className="text-xl font-bold">Top Casino Tokens</h2>
      </div>
      <button className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity flex items-center gap-2">
        View Analytics
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
    <div className="space-y-4">
      {tokens.map((token) => (
        <div key={token.rank} className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl bg-[var(--card-hover)]/40">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-[var(--text-secondary)] w-6">#{token.rank}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{token.name}</span>
                <span className="px-2 py-1 text-[10px] uppercase tracking-[0.2em] rounded-full bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--text-secondary)]">
                  {token.liquidity}
                </span>
              </div>
              <div className="flex items-center text-sm text-[var(--accent)] mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                {token.change}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg block">{token.volume}</span>
            <span className="text-xs text-[var(--text-secondary)]">24h volume</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TopTokens;
