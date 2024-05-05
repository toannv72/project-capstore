import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/admin/Admin";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin";
import Admin1 from "./page/admin/Admin copy";
import ErrorPage from "./page/404/ErrorPage";

export const routers = createBrowserRouter([
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
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
      // Add other unprotected admin routes here (if any)
    ],
  },
]);
