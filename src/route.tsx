import { createBrowserRouter } from "react-router";
import About from "./components/AboutMe/About";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Create from "./components/BlogCreate/Create";
import Detail from "./components/BlogDetail/Detail";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeLayout from "./pages/HomeLayout";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeLayout /> },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        ),
      },
      { path: "/about", element: <About /> },
      { path: "/detail/:id", element: <Detail /> },
      { path: "/signup", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
