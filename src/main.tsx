import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import { config } from './wagmi.ts';

import App from './components/App.tsx';
import RWD from './components/RWD.tsx';

import './styles/styles.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'rwd',
    element: <RWD />,
  },
]);

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
