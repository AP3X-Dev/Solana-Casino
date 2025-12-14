import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteLoader from './components/ui/RouteLoader';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const CasinoCreator = lazy(() => import('./pages/CasinoCreator'));
const About = lazy(() => import('./pages/About'));
const TelegramBot = lazy(() => import('./pages/TelegramBot'));
const Wallets = lazy(() => import('./pages/Wallets'));
const Settings = lazy(() => import('./pages/Settings'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const UltraCoinFlip = lazy(() => import('./components/games/UltraCoinFlip'));
const UltraDiceRoll = lazy(() => import('./components/games/UltraDiceRoll'));
const UltraSlots = lazy(() => import('./components/games/UltraSlots'));
const GameSelector3D = lazy(() => import('./components/games/GameSelector3D'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const StyleTest = lazy(() => import('./components/test/StyleTest'));
const ComponentShowcase = lazy(() => import('./pages/ComponentShowcase'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games" element={<GameSelector3D />} />
        <Route path="/create" element={<CasinoCreator />} />
        <Route path="/bot" element={<TelegramBot />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/tournaments" element={<Tournaments />} />

        {/* Ultra Games */}
        <Route path="/coinflip" element={<UltraCoinFlip />} />
        <Route path="/dice" element={<UltraDiceRoll />} />
        <Route path="/slots" element={<UltraSlots />} />

        {/* Analytics & Leaderboard */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {import.meta.env.DEV && (
          <>
            <Route path="/style-test" element={<StyleTest />} />
            <Route path="/components" element={<ComponentShowcase />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
