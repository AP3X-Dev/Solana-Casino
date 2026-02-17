import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, MessageSquare, Coins, Code, Award, Users } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const About = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="subtle" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative space-y-16 pb-20"
      >
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] to-transparent pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 pt-12 pb-20 relative">
            <motion.div variants={itemVariants} className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">
                About Solana Casino Platform
              </h1>
              <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
                A revolutionary platform that transforms any Solana token into a fully-featured casino ecosystem with provably fair games and seamless integration.
              </p>
              <div className="mt-8 rounded-xl overflow-hidden shadow-2xl border border-[var(--accent-glow)] max-w-2xl mx-auto">
                <img src="/slots.png" alt="Solana Casino Slots Game" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="max-w-6xl mx-auto px-4">
          <motion.div variants={itemVariants} className="bg-[var(--card)] rounded-2xl p-12 border border-[var(--border)]">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">Our Mission</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              We're building the most engaging and transparent gaming platform on Solana. Our mission is to provide token creators with powerful tools to engage their communities through provably fair games, while offering players a seamless and enjoyable gaming experience.
            </p>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              We believe in the power of blockchain technology to revolutionize online gaming by providing transparency, fairness, and community ownership. Our platform is designed to be accessible to everyone, from experienced crypto users to newcomers.
            </p>
            <div className="mt-8 p-4 bg-[var(--accent)] bg-opacity-10 rounded-xl border border-[var(--accent)] border-opacity-20">
              <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Platform Fee</h3>
              <p className="text-[var(--text-secondary)] mb-2">
                A small 1% fee is applied to all transactions to support the platform's development and maintenance.
              </p>
              <div className="flex items-center space-x-2 text-[var(--text-primary)]">
                <span className="font-medium text-[var(--text-secondary)]">Recipient Address:</span>
                <code className="bg-[var(--background)] px-2 py-1 rounded text-sm">GeG6GYJCB4jRnNkztjyd29F6NgBVr1vJ83bwrxJD1S67</code>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Platform Features */}
        <section className="max-w-6xl mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">Platform Features</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Provably Fair"
              description="All games use SHA256-based algorithms to ensure transparent and verifiable outcomes"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Setup"
              description="Launch your casino in minutes with our intuitive dashboard and configuration tools"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Telegram Integration"
              description="Let users play directly in your community chat groups with our Telegram bot"
            />
            <FeatureCard
              icon={<Coins className="w-8 h-8" />}
              title="Token Compatible"
              description="Support for any SPL token with custom liquidity pools and treasury management"
            />
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="Open Source"
              description="Transparent codebase with regular updates and community contributions"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Community Focused"
              description="Built for token communities with features like leaderboards and rewards"
            />
          </div>
        </section>

        {/* Recent Updates */}
        <section className="max-w-6xl mx-auto px-4">
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[var(--accent-soft)] to-blue-500/10 rounded-2xl p-12 border border-[var(--border)]">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text-primary)]">Recent Platform Updates</h2>

            <div className="space-y-6">
              <UpdateCard
                version="v1.2.0"
                date="May 2025"
                title="UI Enhancement Update"
                description="Completely redesigned game interfaces with improved animations, visual effects, and sound integration. Enhanced user experience with better feedback and accessibility."
                features={[
                  "Enhanced game animations and visual effects",
                  "Improved button styling with proper text contrast",
                  "Added sound effects to the Slots game",
                  "Redesigned game history displays",
                  "Fixed wallet integration issues"
                ]}
              />

              <UpdateCard
                version="v1.1.0"
                date="March 2025"
                title="New Games & Features"
                description="Added new games and improved existing ones with better mechanics and visuals."
                features={[
                  "Added Slots game with multiple symbols and payouts",
                  "Improved CoinFlip and DiceRoll games",
                  "Added provably fair verification system",
                  "Enhanced mobile responsiveness",
                  "Improved wallet integration"
                ]}
              />

              <UpdateCard
                version="v1.0.0"
                date="January 2025"
                title="Initial Release"
                description="First public release of the Solana Casino Platform."
                features={[
                  "Basic CoinFlip and DiceRoll games",
                  "Wallet integration with Phantom",
                  "Provably fair system foundation",
                  "Basic dashboard and game selection",
                  "Responsive design for mobile and desktop"
                ]}
              />
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4 }}
    className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all group"
  >
    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--secondary-soft)] flex items-center justify-center mb-4 text-[var(--accent)] group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{title}</h3>
    <p className="text-[var(--text-secondary)]">{description}</p>
  </motion.div>
);

// Update Card Component
interface UpdateCardProps {
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
}

const UpdateCard = ({ version, date, title, description, features }: UpdateCardProps) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.01 }}
    className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all"
  >
    <div className="flex flex-wrap items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
      <div className="flex items-center space-x-3">
        <span className="px-3 py-1 rounded-full text-sm bg-[var(--accent)] bg-opacity-15 text-[var(--accent)] font-semibold">
          {version}
        </span>
        <span className="text-sm text-[var(--text-secondary)]">{date}</span>
      </div>
    </div>
    <p className="text-[var(--text-secondary)] mb-4">{description}</p>
    <ul className="space-y-2 text-[var(--text-secondary)]">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Award className="w-4 h-4 text-[var(--accent)] mt-1 mr-2 flex-shrink-0" />
          <span className="text-[var(--text-secondary)]">{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default About;
