import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import React from "react";
import { Home } from "./pages/home";

const Remote = React.lazy(() => import("remote/app"));
const Cart = React.lazy(() => import("cart/app"));

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
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Remote />
        </React.Suspense>
      },
      {
        path: '/cart/*',
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Cart />
        </React.Suspense>
      }
    ]
  }
])