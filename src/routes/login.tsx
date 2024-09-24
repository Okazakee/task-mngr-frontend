import { createFileRoute } from '@tanstack/react-router'

// TODO login page with oauth

export const Route = createFileRoute('/login')({
  component: () => <div>login page!</div>,
})