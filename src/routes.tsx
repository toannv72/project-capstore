import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/admin/Admin";
import ComHeader from "./Components/ComHeader/ComHeader";
import React from "react";
import LoginPage from "./page/login/LoginPage";
import ErrorPage from "./page/404/ErrorPage";
import InstituteManagement from "./page/Manager/InstituteManagement/InstituteManagement";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin";
import TableUser from "./page/admin/TableUser/TableUser";
import TableElder from "./page/admin/TableElder/TableElder";
import TableStaff from "./page/admin/TableStaff/TableStaff";
import NursingPackage from "./page/Manager/NursingPackage/NursingPackage";

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
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
        element: <TableUser />,
      },
      {
        path: "/admin/institute",
        element: <InstituteManagement />,
      },
      {
        path: "/admin/user",
        element: <TableUser />,
      },
      {
        path: "/admin/elder",
        element: <TableElder />,
      },
      {
        path: "/admin/staff",
        element: <TableStaff />,
      },
      {
        path: "/admin/nursingPackage",
        element: <NursingPackage />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
]);
