import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Footer from '../components/layouts/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />

      <Footer>Simple task management app by Okazakee</Footer>

      <TanStackRouterDevtools />
    </>
  ),
})