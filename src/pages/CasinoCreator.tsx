import { useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Coins, MessageSquare, Settings, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Checkbox from '../components/ui/Checkbox';
import Input from '../components/ui/Input';
import PageHeader from '../components/ui/PageHeader';
import Textarea from '../components/ui/Textarea';
import { cn } from '../utils/cn';

const CasinoCreator = () => {
  const { connected } = useWallet();
  const [step, setStep] = useState(1);

  const steps = useMemo(
    () => [
      { id: 1, title: 'Token setup', description: 'Token & treasury', icon: <Coins className="h-5 w-5" /> },
      { id: 2, title: 'Game settings', description: 'Limits & enabled games', icon: <Settings className="h-5 w-5" /> },
      { id: 3, title: 'Telegram bot', description: 'Community automation', icon: <MessageSquare className="h-5 w-5" /> },
    ],
    []
  );

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          <PageHeader
            eyebrow="Creator"
            title="Create a Casino"
            subtitle="Launch a token-powered casino with provably fair games and community tools."
            icon={<Coins className="h-6 w-6 text-[var(--accent)]" />}
          />

          <Card variant="glass" className="overflow-hidden">
            <CardContent className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xl font-bold">Connect your wallet</div>
                <div className="text-[var(--text-secondary)]">
                  Connect Phantom to configure a casino and simulate deployment settings.
                </div>
              </div>
              <div className="wallet-adapter-button-trigger">
                <WalletMultiButton className="!bg-gradient-to-r !from-[var(--accent)] !to-[var(--secondary)] !rounded-2xl !font-bold !px-6 !py-3 !transition-all !duration-300 hover:!scale-105" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <PageHeader
          eyebrow="Creator"
          title="Create a Casino"
          subtitle="Configure a token casino in minutes. Deployment hooks are coming next."
          icon={<Coins className="h-6 w-6 text-[var(--accent)]" />}
        />

        {/* Stepper */}
        <Card variant="glass" className="overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                {steps.map((s, idx) => (
                  <div key={s.id} className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'h-10 w-10 rounded-2xl flex items-center justify-center border',
                          step >= s.id
                            ? 'border-[var(--accent)] bg-gradient-to-r from-[var(--accent-soft)] to-[var(--secondary-soft)] text-[var(--text-primary)]'
                            : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]'
                        )}
                      >
                        {s.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={cn('text-sm font-bold truncate', step >= s.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
                          {s.title}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] truncate">{s.description}</div>
                      </div>
                    </div>

                    {idx < steps.length - 1 ? (
                      <div className="mt-3 h-1 rounded-full bg-[var(--border)] overflow-hidden">
                        <div
                          className={cn(
                            'h-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] transition-all',
                            step > s.id ? 'w-full' : 'w-0'
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {step === 1 && <TokenSetup />}
        {step === 2 && <GameSettings />}
        {step === 3 && <BotConfiguration />}

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Button
            variant="secondary"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (step === 3) {
                toast.success('Casino configuration saved (demo). Deployment wiring coming soon.');
                return;
              }
              setStep((prev) => Math.min(3, prev + 1));
            }}
          >
            {step === 3 ? 'Launch casino' : 'Next'}
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TokenSetup = () => (
  <Card interactive>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-[var(--accent)]" />
        Token setup
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--text-primary)]">Token address</label>
          <Input placeholder="SPL token mint address" />
          <div className="text-xs text-[var(--text-secondary)]">The mint address for the token used in your casino.</div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--text-primary)]">House wallet</label>
          <Input placeholder="Treasury wallet address" />
          <div className="text-xs text-[var(--text-secondary)]">Treasury used for payouts and liquidity management.</div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--text-primary)]">Initial liquidity</label>
        <Input type="number" min={0} placeholder="0.0" />
        <div className="text-xs text-[var(--text-secondary)]">Sets initial pool depth and max bet constraints.</div>
      </div>
    </CardContent>
  </Card>
);

const GameSettings = () => (
  <Card interactive>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-[var(--accent)]" />
        Game settings
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--text-primary)]">Maximum bet</label>
          <Input type="number" min={0} placeholder="0.0" />
          <div className="text-xs text-[var(--text-secondary)]">Hard cap per bet to protect liquidity.</div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--text-primary)]">House edge (%)</label>
          <Input type="number" min={0} max={20} step={0.1} placeholder="5.0" />
          <div className="text-xs text-[var(--text-secondary)]">Applies across supported games.</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-[var(--text-primary)]">Enabled games</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Coin Flip', defaultChecked: true },
            { label: 'Dice Roll', defaultChecked: true },
            { label: 'Slots', defaultChecked: true },
            { label: 'Chat Roulette', defaultChecked: false },
          ].map((game) => (
            <label key={game.label} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card-hover)] px-4 py-3">
              <Checkbox defaultChecked={game.defaultChecked} />
              <span className="font-semibold">{game.label}</span>
            </label>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const BotConfiguration = () => (
  <Card interactive>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-[var(--accent)]" />
        Telegram bot setup
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--text-primary)]">Bot token</label>
        <Input placeholder="123456:ABCDEF..." />
        <div className="text-xs text-[var(--text-secondary)]">Store secrets securely in production (env/secret manager).</div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--text-primary)]">Welcome message</label>
        <Textarea placeholder="Welcome to the casino! Type /play to begin." />
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-[var(--text-primary)]">Bot features</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['Group chat games', 'Private games', 'Token balance checks', 'Leaderboards', 'Daily quests', 'Anti-spam controls'].map((feature) => (
            <label key={feature} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card-hover)] px-4 py-3">
              <Checkbox defaultChecked={['Group chat games', 'Leaderboards'].includes(feature)} />
              <span className="font-semibold">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CasinoCreator;
