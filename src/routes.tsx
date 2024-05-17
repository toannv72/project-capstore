import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/admin/Admin";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin";
import Admin1 from "./page/admin/Admin copy";
import ComHeader from "./Components/ComHeader/ComHeader";
import React from "react";
import ComLogin from "./Components/ComLogin/ComLogin";
import ErrorPage from "./page/404/ErrorPage";
import ComLoading from "./Components/ComLoading/ComLoading";
import ComPost from "./Components/ComPost/ComPost";
import ComRegister from "./Components/ComRegister/ComRegister";
import InstituteManagement from "./page/Manager/InstituteManagement/InstituteManagement";

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
        path: "/login",
        element: <ComLogin />,
      },
      {
        path: "/register",
        element: <ComRegister />,
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
        path: "/admin/institute",
        element: <InstituteManagement />,
      },
      {
        path: "/admin/institute2",
        element: <InstituteManagement />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
]);
