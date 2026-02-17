import AnimatedBackground from '../components/ui/AnimatedBackground';
import AdvancedLeaderboard from '../components/leaderboard/AdvancedLeaderboard';

const Leaderboard = () => (
  <div className="relative min-h-screen">
    <AnimatedBackground variant="subtle" />
    <div className="relative max-w-7xl mx-auto px-6 py-10">
      <AdvancedLeaderboard />
    </div>
  </div>
);

export default Leaderboard;
