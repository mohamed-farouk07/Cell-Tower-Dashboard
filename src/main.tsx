import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeProviderClient from './ThemeProviderClient';
import "./i18n/i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderClient>
      <App />
    </ThemeProviderClient>
  </StrictMode>
);
