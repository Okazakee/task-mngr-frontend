import { createFileRoute, redirect } from '@tanstack/react-router'
import Register from '../components/pages/Register'

export const Route = createFileRoute('/register')({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication

    const valid = await isLogged();

    console.log(valid)

    if (valid) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: Register,
})
