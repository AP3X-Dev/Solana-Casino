import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from './components/WalletProvider';
import EnhancedNavigation from './components/layout/EnhancedNavigation';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[var(--card)] border border-[var(--border)] px-4 py-2 rounded-lg"
          >
            Skip to content
          </a>
          <EnhancedNavigation />
          <main id="main" className="pt-24 pb-16">
            <AppRoutes />
          </main>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--accent)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--error)',
                  secondary: 'white',
                },
              },
            }}
          />
        </div>
      </BrowserRouter>
    </WalletProvider>
  );
};

export default App;
