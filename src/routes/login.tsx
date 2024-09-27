import { createFileRoute, redirect } from '@tanstack/react-router'

// TODO login page with oauth and normal registration

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {

    const { isLogged } = context.authentication;

    const valid = await isLogged();

    if (valid) {
      throw redirect({
        to: '/'
      });
    }
  },
  component: () => <div>login page! </div>,
})