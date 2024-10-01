import { createFileRoute, redirect } from '@tanstack/react-router';
import Dashboard from '../components/pages/Dashboard';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location, context }) => {

    const { isLogged } = context.authentication;

    const valid = await isLogged();

    if (!valid) {
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