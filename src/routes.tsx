import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/admin/Admin";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin";
import Admin1 from "./page/admin/Admin copy";
import ComHeader from "./Components/ComHeader/ComHeader";
import React from "react";
import ComLogin from "./Components/ComLogin/ComLogin";
import ComLoading from "./Components/ComLoading/ComLoading";
import ComPost from "./Components/ComPost/ComPost";
import ComRegister from "./Components/ComRegister/ComRegister";

export const routers = createBrowserRouter([
  {
    path: "*",
    element: <Home />,
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
        path: "/login",
        element: <ComLogin />,
      },
      {
        path: "/register",
        element: <ComRegister  />,
      }
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
