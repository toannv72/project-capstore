import { RouterProvider } from "react-router-dom";
import { routers } from "./routes.tsx";
import ComHeaderAdmin from "./Components/ComHeaderAdmin/ComHeaderAdmin.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";

function App() {
  return (
     <LanguageProvider>
      <RouterProvider router={routers} />
    </LanguageProvider>
  );
}

export default App;
