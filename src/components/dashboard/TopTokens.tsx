import { TrendingUp } from 'lucide-react';

interface TokenItem {
  rank: number;
  name: string;
  volume: string;
  change: string;
}

const tokens: TokenItem[] = [
  { rank: 1, name: 'BONK', volume: '123,456 SOL', change: '+12.5%' },
  { rank: 2, name: 'WEN', volume: '98,765 SOL', change: '+8.3%' },
  { rank: 3, name: 'MYRO', volume: '45,678 SOL', change: '+5.7%' },
];

const TopTokens = () => (
  <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[#45b26b80] transition-all">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">Top Casino Tokens</h2>
      <button className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity">
        View All
      </button>
    </div>
    <div className="space-y-4">
      {tokens.map((token) => (
        <div key={token.rank} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-[var(--text-secondary)] w-6">
              #{token.rank}
            </span>
            <div>
              <span className="font-medium">{token.name}</span>
              <div className="flex items-center text-sm text-[var(--accent)] mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                {token.change}
              </div>
            </div>
          </div>
          <span className="font-medium">{token.volume}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TopTokens;
