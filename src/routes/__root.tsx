import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Footer from '../components/layouts/Footer'
import { AuthContext } from '../services/authService';
import Header from '../components/layouts/Header';

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Header>
        Task Manager
      </Header>

      <Outlet />

      <Footer>Made by Okazakee</Footer>

      <TanStackRouterDevtools />
    </>
  ),
})