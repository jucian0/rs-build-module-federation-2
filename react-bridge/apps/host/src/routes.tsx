import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { createRemoteComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/enhanced/runtime';

const FallbackComp = <div>loading</div>;

const FallbackErrorComp = (info: any) => {
  return (
    <div>
      {info?.error?.message}
      <button type="button" onClick={() => info.resetErrorBoundary()}>
        resetErrorBoundary
      </button>
    </div>
  );
};

const Cart = createRemoteComponent({
  loader: () => loadRemote('cart/app'),
  fallback: FallbackErrorComp,
  loading: FallbackComp,
});

const Remote = createRemoteComponent({
  loader: () => loadRemote('remote/app'),
  fallback: FallbackErrorComp,
  loading: FallbackComp,
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
        Component: () => <Remote basename="remote" />
      },
      {
        path: '/cart/*',
        Component: () => <Cart basename="cart" />
      },
    ]
  },
  {
    path: '*',
    element: <>Home 404</>
  }
])