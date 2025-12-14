import EnhancedGameStats from '../components/analytics/EnhancedGameStats';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <EnhancedGameStats />
      </div>
    </div>
  );
};

export default Analytics;

