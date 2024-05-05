import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/admin/Admin";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin";
import Admin1 from "./page/admin/Admin copy";
import ComHeader from "./Components/ComHeader/ComHeader";
import React from "react";
import ComLogin from "./Components/ComLogin/ComLogin";
import ErrorPage from "./page/404/ErrorPage";

export const routers = createBrowserRouter([
  {
    path: "*",
    element: (
      <ComHeader>
        <ErrorPage goTo={"/"} statusCode={"404"} />
      </ComHeader>
    ),
  },
  {
    path: "/",
    element: (
      <ComHeader>
        <Outlet />
      </ComHeader>
    ),
    children: [
      {
        path: "/",
        element: <ComLogin />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ComHeaderAdmin>
        <Outlet />
      </ComHeaderAdmin>
    ),
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/abc",
        element: <Admin1 />,
      },
      {
        path: "/admin/abc",
        element: <Admin1 />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
]);
