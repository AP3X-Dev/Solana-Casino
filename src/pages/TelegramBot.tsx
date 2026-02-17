import { motion } from 'framer-motion';
import { Bot, MessageSquare, Sparkles, Zap, Trophy, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { cn } from '../utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const TelegramBot = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="subtle" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-5xl mx-auto px-6 py-10 space-y-8"
      >
        <motion.div variants={itemVariants}>
          <PageHeader
            eyebrow="Integration"
            title="Telegram Bot"
            subtitle="Bring games to your community chat with instant, provably fair results."
            icon={<MessageSquare className="h-6 w-6 text-[var(--accent)]" />}
          />
        </motion.div>

        {/* Chat mockup */}
        <motion.div variants={itemVariants} className="max-w-sm mx-auto">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-2xl">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">Solana Casino Bot</div>
                <div className="text-xs text-white/70">Online</div>
              </div>
            </div>
            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[200px]">
              {[
                { from: 'bot', text: 'Welcome! Type /flip to play Coin Flip' },
                { from: 'user', text: '/flip 0.1 heads' },
                { from: 'bot', text: 'Heads! You won 0.19 SOL' },
              ].map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                    msg.from === 'bot'
                      ? 'bg-[var(--card-hover)] text-[var(--text-primary)]'
                      : 'bg-[var(--accent)] text-white ml-auto'
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step-by-step setup */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-bold text-center mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: 1, icon: Bot, title: 'Add the Bot', desc: 'Invite @SolanaCasinoBot to your Telegram group.' },
              { step: 2, icon: Zap, title: 'Play Games', desc: 'Use commands like /flip, /dice, and /slots directly in chat.' },
              { step: 3, icon: CreditCard, title: 'Instant Payouts', desc: 'Winnings settle instantly with transparent verification links.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 glass-effect group cursor-default relative"
              >
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {item.step}
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--secondary)]/20 flex items-center justify-center mb-4 text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="font-bold text-lg mb-1">{item.title}</div>
                <div className="text-sm text-[var(--text-secondary)]">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MessageSquare, title: 'In-Chat Games', desc: 'Play Coin Flip, Dice, and more directly in groups.' },
            { icon: Trophy, title: 'Leaderboards', desc: 'Automated weekly leaderboards with shareable highlights.' },
            { icon: CreditCard, title: 'Fast Settlements', desc: 'Instant payouts and transparent verification links.' },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 glass-effect group cursor-default"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--secondary)]/20 flex items-center justify-center mb-3 text-[var(--accent)] group-hover:scale-110 transition-transform">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="font-bold mb-1">{feature.title}</div>
              <div className="text-sm text-[var(--text-secondary)]">{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" size="lg" className="shadow-lg shadow-[var(--accent-glow)]">
              <Sparkles className="h-5 w-5" />
              Request Early Access
            </Button>
          </motion.div>
          <p className="text-sm text-[var(--text-secondary)]">
            The Telegram bot is being upgraded to match the new UI and provably-fair game engine.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TelegramBot;
