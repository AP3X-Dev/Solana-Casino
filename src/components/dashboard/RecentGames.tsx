import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface GameItem {
  id: number;
  game: string;
  time: string;
  amount: string;
  player: string;
  isWin: boolean;
}

const games: GameItem[] = [
  { id: 1, game: 'Coin Flip #1234', time: '2 minutes ago', amount: '+0.5 SOL', player: '@player1', isWin: true },
  { id: 2, game: 'Dice Roll #5678', time: '5 minutes ago', amount: '-0.3 SOL', player: '@player2', isWin: false },
  { id: 3, game: 'Coin Flip #9012', time: '8 minutes ago', amount: '+0.8 SOL', player: '@player3', isWin: true },
];

const RecentGames = () => (
  <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[#45b26b80] transition-all">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">Recent Games</h2>
      <button className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity">
        View All
      </button>
    </div>
    <div className="space-y-4">
      {games.map((game) => (
        <div key={game.id} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
          <div>
            <p className="font-medium">{game.game}</p>
            <p className="text-sm text-[var(--text-secondary)]">{game.time}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-1">
              {game.isWin ? (
                <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              )}
              <p className={game.isWin ? 'text-[var(--accent)]' : 'text-red-400'}>
                {game.amount}
              </p>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{game.player}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentGames;
