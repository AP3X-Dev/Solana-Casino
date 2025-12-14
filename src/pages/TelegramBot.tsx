import { motion } from 'framer-motion';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const TelegramBot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <PageHeader
          eyebrow="Integration"
          title="Telegram Bot"
          subtitle="Bring games to your community chat with instant, provably fair results."
          icon={<MessageSquare className="h-6 w-6 text-[var(--accent)]" />}
        />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="glass" className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Coming soon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="text-[var(--text-secondary)]">
                The Telegram bot experience is being upgraded to match the new UI and provably-fair game engine.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <div className="font-semibold">In-chat games</div>
                  <div className="text-sm text-[var(--text-secondary)]">Play Coin Flip, Dice, and more directly in groups.</div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <div className="font-semibold">Leaderboards</div>
                  <div className="text-sm text-[var(--text-secondary)]">Automated weekly leaderboards with shareable highlights.</div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <div className="font-semibold">Instant payouts</div>
                  <div className="text-sm text-[var(--text-secondary)]">Fast settlements and transparent verification links.</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">
                  <Sparkles className="h-4 w-4" />
                  Request early access
                </Button>
                <Button variant="secondary">View roadmap</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TelegramBot;

