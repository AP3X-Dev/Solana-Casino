import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ArrowUpRight, Cpu, Flame, ShieldCheck, Trophy, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import RecentGames from '../components/dashboard/RecentGames';
import TopTokens from '../components/dashboard/TopTokens';
import PageContainer from '../components/layout/PageContainer';

const coreMetrics = [
  {
    title: 'House Treasury',
    value: '45,678 SOL',
    change: '+8.7%',
    icon: <Wallet className="w-8 h-8 text-green-400" />,
    detail: 'Active liquidity across all casino pools',
  },
  {
    title: 'Active Players',
    value: '567',
    change: '+5.2%',
    icon: <Users className="w-8 h-8 text-blue-400" />,
    detail: 'High engagement sustained over the last 24h',
  },
  {
    title: 'Total Winnings',
    value: '1,234 SOL',
    change: '+12.5%',
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    detail: 'Payouts delivered instantly with verified seeds',
  },
];

const healthSignals = [
  {
    label: 'Platform Uptime',
    value: '99.98%',
    status: 'Healthy',
    tone: 'text-[var(--success)]',
    description: 'Zero downtime events in the last 12 days',
  },
  {
    label: 'Wallet Connections',
    value: '1,328',
    status: 'Scaling',
    tone: 'text-[var(--accent)]',
    description: 'Session handshakes up 14% week-over-week',
  },
  {
    label: 'Risk Alerts',
    value: '0 critical',
    status: 'Clear',
    tone: 'text-[var(--text-secondary)]',
    description: 'Automated monitors report healthy liquidity',
  },
];

const operationalTracks = [
  {
    name: 'Game Fairness',
    progress: 98,
    annotation: 'Seeds rotated and verified on every roll',
  },
  {
    name: 'Payout Reliability',
    progress: 96,
    annotation: 'Sub-second settlement to connected wallets',
  },
  {
    name: 'Latency Budget',
    progress: 92,
    annotation: 'Edge cache serving assets within 80ms',
  },
];

const RoadmapPill: React.FC<{ label: string; tone?: string }> = ({ label, tone = 'text-[var(--text-secondary)]' }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-[var(--card-hover)] border border-[var(--border)] ${tone}`}>
    {label}
  </span>
);

const ProgressTrack: React.FC<{ name: string; progress: number; annotation: string }> = ({ name, progress, annotation }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between text-sm">
      <span className="text-[var(--text-primary)] font-medium">{name}</span>
      <span className="text-[var(--text-secondary)]">{progress}%</span>
    </div>
    <div className="h-2 rounded-full bg-[var(--background-secondary)] overflow-hidden border border-[var(--border)]">
      <div
        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="text-sm text-[var(--text-secondary)]">{annotation}</p>
  </div>
);

const Dashboard = () => {
  const { connected } = useWallet();

  return (
    <PageContainer
      title="Casino Control Center"
      description="Live operational overview, integrity health, and liquidity performance across the entire Solana Casino platform."
      actions={
        connected ? (
          <button className="px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-semibold shadow-lg shadow-[var(--accent-glow)] hover:opacity-90 transition">
            Deploy New Game
          </button>
        ) : (
          <div className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)]">Connect wallet to deploy</div>
        )
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreMetrics.map((metric) => (
          <div key={metric.title} className="space-y-3">
            <StatCard icon={metric.icon} title={metric.title} value={metric.value} change={metric.change} />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Operational Health</p>
              <h2 className="text-xl font-bold">Live Signal Board</h2>
            </div>
            <ShieldCheck className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div className="space-y-4">
            {healthSignals.map((signal) => (
              <div key={signal.label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-hover)]/40 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{signal.label}</p>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-[var(--card)] ${signal.tone}`}>
                    {signal.status}
                  </span>
                </div>
                <p className="text-2xl font-black">{signal.value}</p>
                <p className="text-sm text-[var(--text-secondary)]">{signal.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Performance Tracks</p>
              <h2 className="text-xl font-bold">Reliability Metrics</h2>
            </div>
            <Cpu className="w-6 h-6 text-[var(--secondary)]" />
          </div>
          <div className="space-y-5">
            {operationalTracks.map((track) => (
              <ProgressTrack key={track.name} {...track} />
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
            <span>Latency & settlement budgets continuously tuned.</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
          </div>
        </div>

        <div className="space-y-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Platform Momentum</p>
              <h2 className="text-xl font-bold">Roadmap & Delivery</h2>
            </div>
            <Flame className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <RoadmapPill label="Provably-fair audit" tone="text-[var(--accent)]" />
              <RoadmapPill label="Telegram bot rollout" />
              <RoadmapPill label="Liquidity balancing v2" />
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-hover)]/40 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Current focus</p>
                <span className="text-xs text-[var(--text-secondary)]">Sprint 14</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Optimizing payout execution paths and caching static assets to reduce cold-start variance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-[var(--text-secondary)]">
              <div>
                <p className="text-[var(--text-primary)] font-semibold">Edge coverage</p>
                <p>7 regions live</p>
              </div>
              <div>
                <p className="text-[var(--text-primary)] font-semibold">Audit readiness</p>
                <p>All contracts linted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <RecentGames />
        <TopTokens />
      </motion.div>
    </PageContainer>
  );
};

export default Dashboard;
