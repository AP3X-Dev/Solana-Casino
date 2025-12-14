import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { applyTheme, getInitialTheme } from './utils/theme';

applyTheme(getInitialTheme());

createRoot(document.getElementById('root')!).render(
  <App />
);
