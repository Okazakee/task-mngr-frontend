import { createLazyFileRoute } from '@tanstack/react-router'
import About from '../components/pages/About'

export const Route = createLazyFileRoute('/about')({
  component: About,
})