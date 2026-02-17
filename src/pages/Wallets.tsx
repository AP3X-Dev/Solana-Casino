import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Sparkles, Wallet as WalletIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
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

const Wallets = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const address = publicKey?.toString() ?? null;
  const shortAddress = address ? `${address.slice(0, 4)}…${address.slice(-4)}` : null;

  const explorerUrl = useMemo(() => (address ? `https://explorer.solana.com/address/${address}` : null), [address]);

  useEffect(() => {
    let cancelled = false;

    async function loadBalance() {
      if (!publicKey) {
        setBalance(null);
        return;
      }
      try {
        const lamports = await connection.getBalance(publicKey);
        if (!cancelled) setBalance(lamports / LAMPORTS_PER_SOL);
      } catch {
        if (!cancelled) setBalance(null);
      }
    }

    void loadBalance();
    const intervalId = window.setInterval(loadBalance, 12_000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [connection, publicKey]);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

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
            eyebrow="Wallet"
            title="Wallets"
            subtitle="Manage your connection and view basic account info."
            icon={<WalletIcon className="h-6 w-6 text-[var(--accent)]" />}
          />
        </motion.div>

        {!connected ? (
          <motion.div variants={itemVariants}>
            <Card variant="premium" glow className="overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--secondary)]/5" />
              <CardContent className="relative pt-8 pb-8 flex flex-col items-center text-center gap-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center shadow-lg shadow-[var(--accent-glow)]">
                    <WalletIcon className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <div className="space-y-2 max-w-sm">
                  <div className="text-2xl font-bold">Connect Your Wallet</div>
                  <div className="text-[var(--text-secondary)]">
                    Connect Phantom to view balances, copy your address, and jump to Solana Explorer.
                  </div>
                </div>
                <div className="wallet-adapter-button-trigger">
                  <WalletMultiButton className="!bg-gradient-to-r !from-[var(--accent)] !to-[var(--secondary)] !rounded-2xl !font-bold !px-8 !py-3 !text-lg !transition-all !duration-300 hover:!scale-105 hover:!shadow-lg hover:!shadow-[var(--accent-glow)]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Sparkles className="h-3 w-3" />
                  Secure, non-custodial connection
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card interactive className="overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--secondary)]/5" />
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
                      <WalletIcon className="h-4 w-4 text-white" />
                    </div>
                    Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-5">
                  {/* Balance - large and prominent */}
                  <div className="text-center py-4">
                    <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">Balance</div>
                    <div className="text-5xl font-black tracking-tight bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)] bg-clip-text text-transparent">
                      {balance === null ? '—' : balance.toFixed(4)}
                    </div>
                    <div className="text-lg font-semibold text-[var(--text-secondary)] mt-1">SOL</div>
                  </div>

                  {/* Address */}
                  <div className="grid gap-2">
                    <div className="text-sm text-[var(--text-secondary)]">Address</div>
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--card-hover)] px-4 py-3">
                      <div className="font-mono text-sm truncate">{address}</div>
                      <Button variant="ghost" size="sm" onClick={handleCopy} className="shrink-0">
                        {copied ? <Check className="h-4 w-4 text-[var(--success)]" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy address</span>
                      </Button>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">Short: {shortAddress}</div>
                  </div>

                  {explorerUrl ? (
                    <a
                      href={explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                      View on Solana Explorer <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="glass" className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-[var(--text-secondary)]">
                    Tip: Use the top navigation to disconnect or switch networks in Settings.
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                      Copy address
                    </Button>
                    {explorerUrl ? (
                      <Button variant="secondary" onClick={() => window.open(explorerUrl, '_blank', 'noreferrer')}>
                        <ExternalLink className="h-4 w-4" />
                        Explorer
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Wallets;
