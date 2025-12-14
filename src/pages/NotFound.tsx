import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
        <div className="text-5xl font-black gradient-text">404</div>
        <div className="mt-2 text-lg font-semibold">Page not found</div>
        <div className="mt-2 text-sm text-[var(--text-secondary)]">
          The route you’re trying to open doesn’t exist.
        </div>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

