import { motion } from 'framer-motion';
import { Award, Bell, Shield, Sparkles, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Tournaments = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="subtle" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto px-6 py-10 space-y-8"
      >
        <motion.div variants={itemVariants}>
          <PageHeader
            eyebrow="Competitive"
            title="Tournaments"
            subtitle="Compete weekly, climb ranks, and unlock exclusive rewards."
            icon={<Trophy className="h-6 w-6 text-[var(--gold)]" />}
          />
        </motion.div>

        {/* Season banner */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] font-semibold text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Season 1 Launching Soon
          </motion.div>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            We're polishing tournament UX and anti-abuse scoring. Expect weekly events across Coin Flip, Dice, and Slots.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {[
            { value: '03', label: 'Days' },
            { value: '14', label: 'Hours' },
            { value: '27', label: 'Minutes' },
            { value: '09', label: 'Seconds' },
          ].map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="text-4xl font-black bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 mb-2 text-[var(--accent)]">
                {unit.value}
              </div>
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{unit.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Trophy, title: 'Weekly Ladders', desc: 'Earn points from wins, streaks, and volume.' },
            { icon: Award, title: 'Reward Tiers', desc: 'Unlock XP, badges, and VIP perks.' },
            { icon: Shield, title: 'Transparent Rules', desc: 'Scoring + provably fair verification for every match.' },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 glass-effect group cursor-default"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--secondary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-lg mb-1">{feature.title}</div>
              <div className="text-sm text-[var(--text-secondary)]">{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tournament bracket mockup */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 glass-effect">
          <h3 className="text-xl font-bold mb-6 text-center">Tournament Bracket Preview</h3>
          <div className="flex items-center justify-center gap-8 overflow-x-auto pb-4">
            {/* Round 1 */}
            <div className="flex flex-col gap-4 min-w-[140px]">
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-center mb-2">Quarter Finals</div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card-hover)] p-3 text-center">
                  <div className="h-2 w-16 mx-auto rounded-full bg-[var(--border)]" />
                </div>
              ))}
            </div>
            {/* Connector */}
            <div className="text-[var(--text-secondary)] text-2xl">&rarr;</div>
            {/* Round 2 */}
            <div className="flex flex-col gap-4 min-w-[140px]">
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-center mb-2">Semi Finals</div>
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card-hover)] p-3 text-center">
                  <div className="h-2 w-16 mx-auto rounded-full bg-[var(--border)]" />
                </div>
              ))}
            </div>
            {/* Connector */}
            <div className="text-[var(--text-secondary)] text-2xl">&rarr;</div>
            {/* Final */}
            <div className="flex flex-col gap-4 min-w-[140px]">
              <div className="text-xs font-semibold text-[var(--gold)] uppercase tracking-wider text-center mb-2">Final</div>
              <div className="rounded-xl border-2 border-[var(--gold)] bg-[var(--card-hover)] p-3 text-center shadow-[0_0_20px_var(--gold-glow)]">
                <Trophy className="h-5 w-5 text-[var(--gold)] mx-auto" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notify CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="primary" size="lg" className="shadow-lg shadow-[var(--accent-glow)]">
              <Bell className="h-5 w-5" />
              Notify Me When It Launches
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tournaments;
