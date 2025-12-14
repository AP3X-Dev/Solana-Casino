import AdvancedLeaderboard from '../components/leaderboard/AdvancedLeaderboard';

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <AdvancedLeaderboard />
      </div>
    </div>
  );
};

export default Leaderboard;

