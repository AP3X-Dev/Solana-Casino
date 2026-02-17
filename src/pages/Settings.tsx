import { motion } from 'framer-motion';
import { Check, Moon, Settings as SettingsIcon, Sun, Wifi } from 'lucide-react';
import { NETWORKS, type NetworkKey, useWalletSettings } from '../components/wallet/walletConfig';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Checkbox from '../components/ui/Checkbox';
import PageHeader from '../components/ui/PageHeader';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { network, setNetwork, autoConnect, setAutoConnect } = useWalletSettings();

  const activeNetworks = (Object.keys(NETWORKS) as NetworkKey[]).filter((key) => NETWORKS[key].active);

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
            eyebrow="Preferences"
            title="Settings"
            subtitle="Theme, wallet preferences, and network configuration."
            icon={<SettingsIcon className="h-6 w-6 text-[var(--accent)]" />}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
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
                <div className="grid grid-cols-2 gap-3">
                  {(['dark', 'light'] as const).map((t) => (
                    <motion.button
                      key={t}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTheme(t)}
                      className={cn(
                        'relative rounded-xl border-2 p-4 text-left transition-all overflow-hidden',
                        theme === t
                          ? 'border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]'
                          : 'border-[var(--border)] hover:border-[var(--text-secondary)]'
                      )}
                    >
                      {/* Mini preview */}
                      <div className={cn(
                        'rounded-lg p-3 mb-3 space-y-2',
                        t === 'dark' ? 'bg-[#0a0a0f]' : 'bg-[#f0f0f5]'
                      )}>
                        <div className={cn('h-2 w-16 rounded-full', t === 'dark' ? 'bg-gray-700' : 'bg-gray-300')} />
                        <div className={cn('h-2 w-10 rounded-full', t === 'dark' ? 'bg-cyan-500/40' : 'bg-cyan-500/30')} />
                      </div>
                      <div className="flex items-center gap-2">
                        {t === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        <span className="font-semibold capitalize">{t}</span>
                      </div>
                      {theme === t && (
                        <motion.div
                          layoutId="themeCheck"
                          className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[var(--accent)] flex items-center justify-center"
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
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
                          'px-4 py-2 rounded-xl border text-sm font-semibold transition-colors flex items-center gap-2',
                          network === key
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                            : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        <span className={cn(
                          'inline-block h-2 w-2 rounded-full',
                          network === key ? 'bg-[var(--success)]' : 'bg-[var(--text-secondary)]'
                        )} />
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
      </motion.div>
    </div>
  );
};

export default Settings;
