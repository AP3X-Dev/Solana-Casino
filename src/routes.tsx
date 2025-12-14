import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteLoader from './components/ui/RouteLoader';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const CasinoCreator = lazy(() => import('./pages/CasinoCreator'));
const About = lazy(() => import('./pages/About'));
const UltraCoinFlip = lazy(() => import('./components/games/UltraCoinFlip'));
const UltraDiceRoll = lazy(() => import('./components/games/UltraDiceRoll'));
const UltraSlots = lazy(() => import('./components/games/UltraSlots'));
const GameSelector3D = lazy(() => import('./components/games/GameSelector3D'));
const AdvancedLeaderboard = lazy(() => import('./components/leaderboard/AdvancedLeaderboard'));
const EnhancedGameStats = lazy(() => import('./components/analytics/EnhancedGameStats'));
const StyleTest = lazy(() => import('./components/test/StyleTest'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games" element={<GameSelector3D />} />
        <Route path="/create" element={<CasinoCreator />} />
        <Route path="/bot" element={<div>Telegram Bot</div>} />
        <Route path="/wallets" element={<div>Wallets</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/about" element={<About />} />

        {/* Ultra Games */}
        <Route path="/coinflip" element={<UltraCoinFlip />} />
        <Route path="/dice" element={<UltraDiceRoll />} />
        <Route path="/slots" element={<UltraSlots />} />

        {/* Analytics & Leaderboard */}
        <Route path="/analytics" element={<EnhancedGameStats />} />
        <Route path="/leaderboard" element={<AdvancedLeaderboard />} />

        {import.meta.env.DEV && (
          <Route path="/style-test" element={<StyleTest />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
