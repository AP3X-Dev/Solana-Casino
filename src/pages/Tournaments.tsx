import { motion } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const Tournaments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <PageHeader
          eyebrow="Competitive"
          title="Tournaments"
          subtitle="Compete weekly, climb ranks, and unlock exclusive rewards."
          icon={<Trophy className="h-6 w-6 text-[var(--gold)]" />}
          actions={
            <Button variant="primary">
              <Sparkles className="h-4 w-4" />
              Join next tournament
            </Button>
          }
        />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="glass" className="overflow-hidden">
            <CardHeader>
              <CardTitle>Season 1 is launching soon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-[var(--text-secondary)]">
                We’re polishing tournament UX and anti-abuse scoring. Expect weekly events across Coin Flip, Dice, and Slots.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <div className="font-semibold">Weekly ladders</div>
                  <div className="text-sm text-[var(--text-secondary)]">Earn points from wins, streaks, and volume.</div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <div className="font-semibold">Reward tiers</div>
                  <div className="text-sm text-[var(--text-secondary)]">Unlock XP, badges, and VIP perks.</div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <div className="font-semibold">Transparent rules</div>
                  <div className="text-sm text-[var(--text-secondary)]">Scoring + provably fair verification for every match.</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Learn more</Button>
                <Button variant="outline">See leaderboard</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Tournaments;

