import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import './index.css'
import { useAuth } from './services/authService';

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

const queryClient = new QueryClient();

export const apiUrl = process.env.VITE_API_URL;

export const token = localStorage.getItem('authToken');

const authentication = useAuth();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ authentication }} />
    </QueryClientProvider>
  </StrictMode>
)