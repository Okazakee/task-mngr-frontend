import { createFileRoute, redirect } from '@tanstack/react-router'

// TODO login page with oauth and normal registration

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ location, context }) => {

    const { isLogged } = context.authentication;

    const valid = await isLogged();

    if (valid) {
      throw redirect({
        to: '/',
        search: {
          // Use the current location to power a redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: () => <div>login page! </div>,
})