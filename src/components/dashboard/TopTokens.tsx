import { TrendingUp, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';

interface TokenItem {
  rank: number;
  name: string;
  volume: string;
  change: string;
  color: string;
}

const tokens: TokenItem[] = [
  { rank: 1, name: 'BONK', volume: '123,456 SOL', change: '+12.5%', color: 'from-orange-400 to-orange-600' },
  { rank: 2, name: 'WEN', volume: '98,765 SOL', change: '+8.3%', color: 'from-blue-400 to-blue-600' },
  { rank: 3, name: 'MYRO', volume: '45,678 SOL', change: '+5.7%', color: 'from-purple-400 to-purple-600' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const TopTokens = () => (
  <Card interactive variant="glass" className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3 border-b border-[var(--border)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--secondary)] flex items-center justify-center">
          <Coins className="h-5 w-5 text-white" />
        </div>
        <CardTitle>Top Casino Tokens</CardTitle>
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
        {tokens.map((token) => (
          <motion.div 
            key={token.rank}
            variants={itemVariants}
            className="group flex items-center justify-between gap-4 py-4 hover:bg-[var(--card-hover)] px-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${token.color} flex items-center justify-center font-bold text-white flex-shrink-0 shadow-lg`}
              >
                {token.rank}
              </motion.div>
              <div className="min-w-0">
                <div className="font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                  {token.name}
                </div>
                <div className="flex items-center text-sm text-[var(--success)] mt-0.5 font-semibold">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {token.change}
                </div>
              </div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="shrink-0 font-bold text-[var(--text-primary)] text-right"
            >
              <div className="text-sm">{token.volume}</div>
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
          View all tokens
        </Button>
      </motion.div>
    </CardContent>
  </Card>
);

export default TopTokens;
