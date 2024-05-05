import { RouterProvider } from "react-router-dom";
import { routers } from "./routes.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import {  NotificationProvider } from "./Notification/Notification.jsx";

function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <RouterProvider router={routers} />
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
