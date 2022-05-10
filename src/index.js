import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { StoreProvider } from './Contexts/Store';
import ColorThemer from './ColorThemer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ColorThemer />
    </StoreProvider>
  </React.StrictMode>
);
