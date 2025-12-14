import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Coins, Gamepad2, Trophy, Zap, Star, Heart,
  Settings, Bell, Search, Sparkles, Crown, Gem, Users
} from 'lucide-react';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Checkbox from '../ui/Checkbox';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import Tooltip from '../ui/Tooltip';
import Dialog from '../ui/Dialog';
import Switch from '../ui/Switch';
import Select from '../ui/Select';
import Tabs from '../ui/Tabs';
import Alert from '../ui/Alert';
import Metric from '../ui/Metric';
import Divider from '../ui/Divider';
import PageHeader from '../ui/PageHeader';
import StatCard from '../ui/StatCard';

const ComponentShowcase: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('coinflip');
  const [activeTab, setActiveTab] = useState('buttons');

  const gameOptions = [
    { value: 'coinflip', label: 'Coin Flip', description: 'Classic 50/50 game' },
    { value: 'dice', label: 'Dice Roll', description: 'Roll the dice' },
    { value: 'slots', label: 'Slots', description: 'Spin to win' },
  ];

  const tabItems = [
    {
      value: 'buttons',
      label: 'Buttons',
      icon: <Zap className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="primary" icon={<Coins className="w-4 h-4" />}>
              With Icon
            </Button>
          </div>
        </div>
      ),
    },
    {
      value: 'inputs',
      label: 'Inputs',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <Input placeholder="Default input" />
          <Input variant="premium" placeholder="Premium input" icon={<Coins />} />
          <Input error placeholder="Error state" />
          <Textarea placeholder="Textarea component..." variant="premium" />
        </div>
      ),
    },
    {
      value: 'forms',
      label: 'Forms',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Checkbox</label>
            <Checkbox label="I agree to the terms" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Switch</label>
            <Switch label="Enable notifications" description="Get alerts for important updates" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Select</label>
            <Select
              options={gameOptions}
              value={selectedGame}
              onChange={setSelectedGame}
              icon={<Gamepad2 />}
              variant="premium"
            />
          </div>
        </div>
      ),
    },
    {
      value: 'cards',
      label: 'Cards',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="solid">
            <CardHeader>
              <CardTitle>Solid Card</CardTitle>
            </CardHeader>
            <CardContent>Solid card content with basic styling</CardContent>
          </Card>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
            </CardHeader>
            <CardContent>Glass morphism effect with blur</CardContent>
          </Card>
          <Card variant="gradient">
            <CardHeader>
              <CardTitle>Gradient Card</CardTitle>
            </CardHeader>
            <CardContent>Beautiful gradient background</CardContent>
          </Card>
          <Card variant="premium" glow elevated>
            <CardHeader>
              <CardTitle>Premium Card</CardTitle>
            </CardHeader>
            <CardContent>Premium with glow and elevation</CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: 'badges',
      label: 'Badges',
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="gold">Gold</Badge>
            <Badge variant="premium" animated>Premium</Badge>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge size="sm" variant="success">Small</Badge>
            <Badge size="md" variant="success">Medium</Badge>
            <Badge size="lg" variant="success">Large</Badge>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge icon={<Star className="w-4 h-4" />}>With Icon</Badge>
            <Badge variant="gold" animated icon={<Crown className="w-4 h-4" />}>
              Animated
            </Badge>
          </div>
        </div>
      ),
    },
    {
      value: 'progress',
      label: 'Progress',
      content: (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-2">Accent Progress</p>
            <ProgressBar value={45} color="accent" />
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Success Progress</p>
            <ProgressBar value={75} color="success" animated />
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Error Progress</p>
            <ProgressBar value={30} color="error" striped />
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">With Stripes</p>
            <ProgressBar value={60} color="warning" striped animated />
          </div>
        </div>
      ),
    },
    {
      value: 'stats',
      label: 'Stats',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            title="Total Winnings"
            value="1,234 SOL"
            change="+12.5%"
            accent="gold"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Active Players"
            value="567"
            change="+5.2%"
            accent="accent"
          />
          <Metric
            value="45,678"
            label="Total Volume"
            unit="SOL"
            change="+8.7%"
            trend="up"
            color="success"
            size="md"
            icon={<Gem />}
            animate
          />
          <Metric
            value="2.45"
            label="Avg Multiplier"
            change="+0.3%"
            color="accent"
            size="md"
            animate
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)] p-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <PageHeader
          title="Component Showcase"
          subtitle="Explore all enhanced UI components with beautiful animations and interactive states"
          icon={<Sparkles className="h-8 w-8" />}
        />

        {/* Alert Examples */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Alerts</h3>
          <Alert variant="success" title="Success!" description="Your changes have been saved successfully" closeable />
          <Alert variant="error" title="Error" description="Something went wrong. Please try again" closeable />
          <Alert variant="warning" title="Warning" description="Please review your input before proceeding" closeable />
          <Alert variant="info" title="Info" description="This is an informational message" closeable />
        </div>

        <Divider animated color="accent" />

        {/* Component Grid */}
        <Tabs items={tabItems} defaultValue="buttons" onChange={setActiveTab} variant="pills" />

        <Divider animated color="secondary" />

        {/* Additional Components */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Interactive Components</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="premium" glow>
              <CardHeader>
                <CardTitle>Tooltips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="This is a tooltip" side="top">
                    <Button variant="secondary">Hover me</Button>
                  </Tooltip>
                  <Tooltip content="Another tooltip" side="right" delay={100}>
                    <Button variant="outline">Try me</Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <Card variant="premium" glow>
              <CardHeader>
                <CardTitle>Dialog/Modal</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="primary" onClick={() => setDialogOpen(true)}>
                  Open Dialog
                </Button>
                <Dialog
                  open={dialogOpen}
                  onOpenChange={setDialogOpen}
                  title="Example Dialog"
                  description="This is a premium modal dialog with smooth animations"
                  actions={
                    <>
                      <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => setDialogOpen(false)}>
                        Confirm
                      </Button>
                    </>
                  }
                >
                  <p>Dialog content goes here. Enjoy smooth animations and great UX!</p>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 py-12 border-t border-[var(--border)]">
          <h3 className="text-2xl font-bold gradient-text">Premium UI Component Library</h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            All components are fully responsive, animated, and support various states.
            Use them throughout your application for consistent, polished interactions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ComponentShowcase;
