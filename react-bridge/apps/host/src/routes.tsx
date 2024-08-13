import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { createRemoteComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/enhanced/runtime';

const Remote = createRemoteComponent({
  loader: () => loadRemote('remote/app'),
  fallback: () => <div>Loading...</div>

});
const Cart = createRemoteComponent({
  loader: () => loadRemote('cart/app'),
  fallback: () => <div>Loading...</div>,
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/remote/*',
        element: <Remote />
      },
      {
        path: '/cart/*',
        element: <Cart />
      }
    ]
  }
])