import React from 'react';
import { ArrowDownRight, ArrowUpRight, BadgeCheck } from 'lucide-react';

interface GameItem {
  id: number;
  game: string;
  time: string;
  amount: string;
  player: string;
  isWin: boolean;
  wager: string;
}

const games: GameItem[] = [
  { id: 1, game: 'Coin Flip #1234', time: '2 minutes ago', amount: '+0.5 SOL', player: '@player1', isWin: true, wager: '0.25 SOL' },
  { id: 2, game: 'Dice Roll #5678', time: '5 minutes ago', amount: '-0.3 SOL', player: '@player2', isWin: false, wager: '0.35 SOL' },
  { id: 3, game: 'Coin Flip #9012', time: '8 minutes ago', amount: '+0.8 SOL', player: '@player3', isWin: true, wager: '0.40 SOL' },
  { id: 4, game: 'Slots #1324', time: '12 minutes ago', amount: '+2.4 SOL', player: '@player4', isWin: true, wager: '0.60 SOL' },
  { id: 5, game: 'Dice Roll #7643', time: '16 minutes ago', amount: '-0.2 SOL', player: '@player5', isWin: false, wager: '0.20 SOL' },
];

const RecentGames = () => (
  <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-lg shadow-black/10">
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Live activity</p>
        <h2 className="text-xl font-bold">Recent Games</h2>
      </div>
      <button className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity inline-flex items-center gap-2">
        View All
        <BadgeCheck className="w-4 h-4" />
      </button>
    </div>
    <div className="space-y-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-hover)]/40 hover:border-[var(--border-hover)] transition"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold">{game.game}</p>
              <p className="text-sm text-[var(--text-secondary)]">{game.time}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span className="px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--border)]">{game.wager} wager</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span className="px-3 py-1 rounded-full bg-[var(--background-secondary)] border border-[var(--border)]">{game.player}</span>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1">
                {game.isWin ? (
                  <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-[var(--error)]" />
                )}
                <p className={game.isWin ? 'text-[var(--accent)] font-semibold' : 'text-[var(--error)] font-semibold'}>
                  {game.amount}
                </p>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Result settled on-chain</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentGames;
