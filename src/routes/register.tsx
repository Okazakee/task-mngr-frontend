import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication

    const valid = await isLogged()

    if (valid) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: () => <div>register page! </div>,
})
