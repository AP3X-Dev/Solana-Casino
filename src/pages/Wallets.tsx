import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Wallet as WalletIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

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
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <PageHeader
          eyebrow="Wallet"
          title="Wallets"
          subtitle="Manage your connection and view basic account info."
          icon={<WalletIcon className="h-6 w-6 text-[var(--accent)]" />}
        />

        {!connected ? (
          <Card variant="glass" className="overflow-hidden">
            <CardContent className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xl font-bold">Connect Phantom</div>
                <div className="text-[var(--text-secondary)]">
                  Connect a wallet to view balances, copy your address, and jump to Solana Explorer.
                </div>
              </div>
              <div className="wallet-adapter-button-trigger">
                <WalletMultiButton className="!bg-gradient-to-r !from-[var(--accent)] !to-[var(--secondary)] !rounded-2xl !font-bold !px-6 !py-3 !transition-all !duration-300 hover:!scale-105" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card interactive>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div className="grid gap-2">
                    <div className="text-sm text-[var(--text-secondary)]">Balance</div>
                    <div className="text-3xl font-extrabold tracking-tight">
                      {balance === null ? '—' : `${balance.toFixed(4)} SOL`}
                    </div>
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

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
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
      </div>
    </div>
  );
};

export default Wallets;

