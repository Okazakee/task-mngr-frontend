import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '../services/authService';
import Dashboard from '../components/pages/Dashboard'; // Import your Dashboard component

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: Dashboard,
});