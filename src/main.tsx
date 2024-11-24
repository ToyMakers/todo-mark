import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Popup from './todomanager/popup.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
