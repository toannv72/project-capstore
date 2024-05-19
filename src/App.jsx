import { RouterProvider } from "react-router-dom";
import { routers } from "./routes.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { NotificationProvider } from "./Notification/Notification.jsx";
import { AuthProvider } from "./Auth/useAuth.jsx";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider router={routers} />
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
