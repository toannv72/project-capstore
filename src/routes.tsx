import { createBrowserRouter } from "react-router-dom";
import Home from './page/Home';



export const routers = createBrowserRouter([
  {
    path: "*",
    element: <Home/>,
  },
]);
