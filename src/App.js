import { RouterProvider } from "react-router-dom";
import { routers } from "./routes.tsx";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin.jsx";

function App() {
  return (
    <ComHeaderAdmin>
      <RouterProvider router={routers} />
    </ComHeaderAdmin>
  );
}

export default App;
