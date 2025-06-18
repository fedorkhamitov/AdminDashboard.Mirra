import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Error404 from "../components/Error404";
import LoginPage from "../pages/LoginPage";
import Home from "../components/Home";
import DashboardPage from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
    errorElement: Error404()
  },
]);

export default router;
