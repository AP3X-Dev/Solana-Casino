import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from './components/WalletProvider';
import EnhancedNavigation from './components/layout/EnhancedNavigation';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {

  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <EnhancedNavigation />
          <main>
            <AppRoutes />
          </main>

          {/* Toast notifications */}
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
