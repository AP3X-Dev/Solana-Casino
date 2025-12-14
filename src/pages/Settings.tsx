import { motion } from 'framer-motion';
import { Moon, Settings as SettingsIcon, Sun, Wifi } from 'lucide-react';
import { NETWORKS, type NetworkKey, useWalletSettings } from '../components/wallet/walletConfig';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Checkbox from '../components/ui/Checkbox';
import PageHeader from '../components/ui/PageHeader';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { network, setNetwork, autoConnect, setAutoConnect } = useWalletSettings();

  const activeNetworks = (Object.keys(NETWORKS) as NetworkKey[]).filter((key) => NETWORKS[key].active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <PageHeader
          eyebrow="Preferences"
          title="Settings"
          subtitle="Theme, wallet preferences, and network configuration."
          icon={<SettingsIcon className="h-6 w-6 text-[var(--accent)]" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card interactive>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  Theme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-[var(--text-secondary)]">
                  Choose a look that fits your vibe.
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={theme === 'dark' ? 'primary' : 'secondary'}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'light' ? 'primary' : 'secondary'}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card interactive>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <label className="flex items-center gap-3">
                  <Checkbox checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} />
                  <div>
                    <div className="font-semibold">Auto-connect</div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      Automatically reconnect your wallet on refresh.
                    </div>
                  </div>
                </label>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Network</div>
                  <div className="flex flex-wrap gap-2">
                    {activeNetworks.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNetwork(key)}
                          className={cn(
                          'px-4 py-2 rounded-xl border text-sm font-semibold transition-colors',
                          network === key
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                            : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        {NETWORKS[key].name}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Current endpoint: <span className="font-mono">{NETWORKS[network].endpoint}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
