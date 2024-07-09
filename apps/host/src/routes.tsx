import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import React from "react";
import { Home } from "./pages/home";

const Remote = React.lazy(() => import("remote/app"));

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
      }
    ]
  }
])