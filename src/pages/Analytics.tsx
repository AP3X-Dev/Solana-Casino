import AnimatedBackground from '../components/ui/AnimatedBackground';
import EnhancedGameStats from '../components/analytics/EnhancedGameStats';

const Analytics = () => (
  <div className="relative min-h-screen">
    <AnimatedBackground variant="subtle" />
    <div className="relative max-w-7xl mx-auto px-6 py-10">
      <EnhancedGameStats />
    </div>
  </div>
);

export default Analytics;
