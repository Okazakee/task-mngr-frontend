import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Footer from '../components/layouts/Footer'
import { AuthContext } from '../services/authService';

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />

      <Footer>Simple task management app by Okazakee</Footer>

      <TanStackRouterDevtools />
    </>
  ),
})