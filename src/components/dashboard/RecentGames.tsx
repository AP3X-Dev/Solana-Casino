import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';

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
  { id: 4, game: 'Slots #3456', time: '12 minutes ago', amount: '+1.2 SOL', player: '@player4', isWin: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const RecentGames = () => (
  <Card interactive variant="glass" className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3 border-b border-[var(--border)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--secondary-soft)] flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-[var(--accent)]" />
        </div>
        <CardTitle>Recent Games</CardTitle>
      </div>
      <Button variant="ghost" size="sm" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
        View all
      </Button>
    </CardHeader>
    <CardContent className="pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="divide-y divide-[var(--border)]"
      >
        {games.map((game, index) => (
          <motion.div 
            key={game.id}
            variants={itemVariants}
            className="flex items-center justify-between gap-4 py-4 hover:bg-[var(--card-hover)] px-2 rounded-lg transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[var(--text-primary)] truncate">{game.game}</div>
              <div className="text-sm text-[var(--text-secondary)]">{game.time} • {game.player}</div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="shrink-0 text-right"
            >
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold ${
                game.isWin 
                  ? 'bg-[var(--success-soft)] text-[var(--success)]' 
                  : 'bg-[var(--error-soft)] text-[var(--error)]'
              }`}>
                {game.isWin ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{game.amount}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 pt-4 border-t border-[var(--border)] text-center"
      >
        <Button variant="ghost" className="w-full text-[var(--accent)] hover:text-[var(--accent-hover)]">
          View full history
        </Button>
      </motion.div>
    </CardContent>
  </Card>
);

export default RecentGames;
