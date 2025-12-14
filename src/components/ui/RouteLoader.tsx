import React from 'react';

const RouteLoader: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-[var(--border)] border-t-[var(--accent)] animate-spin" />
        <div className="text-sm text-[var(--text-secondary)]">Loading…</div>
      </div>
    </div>
  );
};

export default RouteLoader;

