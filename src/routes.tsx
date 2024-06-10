import { Outlet, createBrowserRouter } from "react-router-dom";
import Admin from "./page/admin/Admin";
import ComHeader from "./Components/ComHeader/ComHeader";
import React from "react";
import LoginPage from "./page/login/LoginPage";
import ErrorPage from "./page/404/ErrorPage";
import InstituteManagement from "./page/Manager/InstituteManagement/InstituteManagement";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin";
import TableUser from "./page/admin/TableUser/TableUser";
import TableElder from "./page/admin/TableElder/TableElder";
import NursingPackage from "./page/Manager/NursingPackage/NursingPackage";
import AppointmentSchedule from "./page/Manager/AppointmentSchedule/AppointmentSchedule";
import ServicePackage from './page/Manager/ServicePackage/ServicePackage';
import ComHeaderStaff from "./Components/ComHeaderStaff/ComHeaderStaff";
import Contract from "./page/Staff/Contract/Contract";
import TableEmployee from './page/admin/TableEmployee/TableEmployee';
import ActivityCalendar from "./page/Manager/ActivityCalendar/ActivityCalendar";
import ProfilePage from "./page/Profile/ProfilePage";
import CreateNotification from "./page/Manager/Notification/CreateNotification";
import Notification from "./page/Notification/Notification";

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
        path: "/admin/employee",
        element: <TableEmployee />,
      },
      {
        path: "/admin/nursingPackage",
        element: <NursingPackage />,
      },
      {
        path: "/admin/appointmentSchedule",
        element: <AppointmentSchedule />,
      },
      {
        path: "/admin/servicePackage",
        element: <ServicePackage />,
      },
      {
        path: "/admin/activitie",
        element: <ActivityCalendar />
      }, {
        path: "/admin/profile",
        element: <ProfilePage />
      },{
        path: "/admin/createNotification",
        element: <CreateNotification />,
      },
      {
        path: "/admin/notification",
        element: <Notification />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
  {
    path: "/staff",
    element: (
      <ComHeaderStaff>
        <Outlet />
      </ComHeaderStaff>
    ),
    children: [
      {
        path: "/staff",
        element: <Admin />,
      },
      {
        path: "/staff/contract",
        element: <Contract />,
      },
      {
        path: "/staff/institute",
        element: <InstituteManagement />,
      },
      {
        path: "/staff/user",
        element: <TableUser />,
      },
      {
        path: "/staff/elder",
        element: <TableElder />,
      },
      {
        path: "/staff/employee",
        element: <TableEmployee />,
      },
      {
        path: "/staff/nursingPackage",
        element: <NursingPackage />,
      },
      {
        path: "/staff/appointmentSchedule",
        element: <AppointmentSchedule />,
      },
      {
        path: "/staff/servicePackage",
        element: <ServicePackage />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
]);
