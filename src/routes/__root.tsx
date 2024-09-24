import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header>Task manager</Header>

      <Outlet />

      <Footer>Simple task management app by Okazakee</Footer>

      <TanStackRouterDevtools />
    </>
  ),
})