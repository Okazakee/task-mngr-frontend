import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  beforeLoad: async ({ location, context }) => {
    const { isLogged } = context.authentication

    const valid = await isLogged()

    if (valid) {
      throw redirect({
        to: '/',
        search: {
          // Use the current location to power a redirect after register
          redirect: location.href,
        },
      })
    }
  },
  component: () => <div>register page! </div>,
})
