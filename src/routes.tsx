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
import ServicePackage from "./page/Manager/ServicePackage/ServicePackage";
import ComHeaderStaff from "./Components/ComHeaderStaff/ComHeaderStaff";
import Contract from "./page/Staff/Contract/Contract";
import TableEmployee from "./page/admin/TableEmployee/TableEmployee";
import ActivityCalendar from "./page/Manager/ActivityCalendar/ActivityCalendar";
import ProfilePage from "./page/Profile/ProfilePage";
import CreateNotification from "./page/Manager/Notification/CreateNotification";
import Notification from "./page/Notification/Notification";
import ChangePassword from "./page/ChangePassword/ChangePassword";
import PotentialCustomer from "./page/Staff/PotentialCustomer/PotentialCustomer";
import Feedback from "./page/Staff/Feedback/Feedback";
import LearningPage from "./page/LearningPage/LearningPage";
import Home from "./page/Home/Home";
import Bill from "./page/Staff/Bill/Bill";
import Health from "./page/Manager/Health/Health";
import DetailElderPage from "./page/admin/TableElder/DetailElderPage";
import Dashboard from "./page/admin/Dashboard/Dashboard";
import PaymentStatus from "./page/User/PaymentStatus";
import AssignTasksManagement from "./page/Manager/AssignTasks/AssignTasksManagement";
import TableAccount from "./page/admin/TableAccount/TableAccount";
import ComHeaderDirector from "./Components/ComHeaderDirector/ComHeaderDirector";
import ComHeaderManager from "./Components/ComHeaderManager/ComHeaderManager";
import DetailUserPage from "./page/admin/TableUser/DetailUserPage";

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
      // <ComHeader>
      <Outlet />
      // </ComHeader>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Page",
        element: <LearningPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/paymentStatus",
        element: <PaymentStatus />,
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
        path: "*",
        element: <ErrorPage goTo={"/admin/institute"} statusCode={"404"} />,
      },
      // {
      //   path: "/admin",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "/admin/abc",
      //   element: <TableUser />,
      // },
      // {
      //   path: "/admin/institute",
      //   element: <InstituteManagement />,
      // },
      {
        path: "/admin/account",
        element: <TableAccount />,
      },
      {
        path: "/admin/user",
        element: <TableUser />,
      },
      // {
      //   path: "/admin/elder",
      //   element: <TableElder />,
      // },
      // {
      //   path: "/admin/elder/:id",
      //   element: <DetailElderPage />,
      // },
      {
        path: "/admin/user/:id",
        element: <DetailUserPage />,
      },
      {
        path: "/admin/employee",
        element: <TableEmployee />,
      },
      // {
      //   path: "/admin/nursingPackage",
      //   element: <NursingPackage />,
      // },
      // {
      //   path: "/admin/appointmentSchedule",
      //   element: <AppointmentSchedule />,
      // },
      // {
      //   path: "/admin/servicePackage",
      //   element: <ServicePackage />,
      // },
      // {
      //   path: "/admin/activitie",
      //   element: <ActivityCalendar />,
      // },
      {
        path: "/admin/profile",
        element: <ProfilePage />,
      },
      // {
      //   path: "/admin/createNotification",
      //   element: <CreateNotification />,
      // },
      {
        path: "/admin/notification",
        element: <Notification />,
      },
      {
        path: "/admin/changePassword",
        element: <ChangePassword />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
  {
    path: "/director",
    element: (
      <ComHeaderDirector>
        <Outlet />
      </ComHeaderDirector>
    ),
    children: [
      {
        path: "*",
        element: <ErrorPage goTo={"/director/dashboard"} statusCode={"404"} />,
      },
      {
        path: "/director",
        element: <Dashboard />,
      },
      {
        path: "/director/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/director/user",
        element: <TableUser />,
      },
      // {
      //   path: "/director/elder",
      //   element: <TableElder />,
      // },
      // {
      //   path: "/director/elder/:id",
      //   element: <DetailElderPage />,
      // },
      {
        path: "/director/employee",
        element: <TableEmployee />,
      },
      // {
      //   path: "/director/nursingPackage",
      //   element: <NursingPackage />,
      // },
      {
        path: "/director/appointmentSchedule",
        element: <AppointmentSchedule />,
      },
      {
        path: "/director/servicePackage",
        element: <ServicePackage />,
      },
      {
        path: "/director/activitie",
        element: <ActivityCalendar />,
      },
      {
        path: "/director/profile",
        element: <ProfilePage />,
      },
      {
        path: "/director/user/:id",
        element: <DetailUserPage />,
      },
      // {
      //   path: "/director/createNotification",
      //   element: <CreateNotification />,
      // },
      {
        path: "/director/notification",
        element: <Notification />,
      },
      {
        path: "/director/changePassword",
        element: <ChangePassword />,
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
        path: "*",
        element: <ErrorPage goTo={"/staff/assignTask"} statusCode={"404"} />,
      },
      {
        path: "/staff",
        element: <Admin />,
      },
      {
        path: "/staff/contract",
        element: <Contract />,
      },
      {
        path: "/staff/assignTask",
        element: <AssignTasksManagement />,
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
        path: "/staff/elder/:id",
        element: <DetailElderPage />,
      },
      {
        path: "/staff/user/:id",
        element: <DetailUserPage />,
      },
      // {
      //   path: "/staff/employee",
      //   element: <TableEmployee />,
      // },
      // {
      //   path: "/staff/nursingPackage",
      //   element: <NursingPackage />,
      // },
      {
        path: "/staff/appointmentSchedule",
        element: <AppointmentSchedule />,
      },
      // {
      //   path: "/staff/servicePackage",
      //   element: <ServicePackage />,
      // },
      {
        path: "/staff/potentialCustomer",
        element: <PotentialCustomer />,
      },
      {
        path: "/staff/profile",
        element: <ProfilePage />,
      },
      {
        path: "/staff/notification",
        element: <Notification />,
      },
      {
        path: "/staff/changePassword",
        element: <ChangePassword />,
      },
      {
        path: "/staff/feedback",
        element: <Feedback />,
      },
      {
        path: "/staff/bill",
        element: <Bill />,
      },
      {
        path: "/staff/health",
        element: <Health />,
      },
      // Add other unprotected admin routes here (if any)
    ],
  },
  {
    path: "/manager",
    element: (
      <ComHeaderManager>
        <Outlet />
      </ComHeaderManager>
    ),
    children: [
      {
        path: "*",
        element: <ErrorPage goTo={"/manager/assignTask"} statusCode={"404"} />,
      },
      {
        path: "/manager",
        element: <Admin />,
      },
      {
        path: "/manager/institute",
        element: <InstituteManagement />,
      },
      // {
      //   path: "/manager/contract",
      //   element: <Contract />,
      // },
      // {
      //   path: "/manager/assignTask",
      //   element: <AssignTasksManagement />,
      // },
      {
        path: "/manager/user",
        element: <TableUser />,
      },
      {
        path: "/manager/elder",
        element: <TableElder />,
      },
      {
        path: "/manager/user/:id",
        element: <DetailUserPage />,
      },
      {
        path: "/manager/elder/:id",
        element: <DetailElderPage />,
      },
      {
        path: "/manager/employee",
        element: <TableEmployee />,
      },
      {
        path: "/manager/appointmentSchedule",
        element: <AppointmentSchedule />,
      },
      {
        path: "/manager/nursingPackage",
        element: <NursingPackage />,
      },
      {
        path: "/manager/servicePackage",
        element: <ServicePackage />,
      },
      // {
      //   path: "/manager/potentialCustomer",
      //   element: <PotentialCustomer />,
      // },
      {
        path: "/manager/profile",
        element: <ProfilePage />,
      },
      {
        path: "/manager/notification",
        element: <Notification />,
      },
      {
        path: "/manager/changePassword",
        element: <ChangePassword />,
      },
      // {
      //   path: "/manager/feedback",
      //   element: <Feedback />,
      // },
      // {
      //   path: "/manager/bill",
      //   element: <Bill />,
      // },
      // {
      //   path: "/manager/health",
      //   element: <Health />,
      // },
      // Add other unprotected admin routes here (if any)
    ],
  },
]);
