import { createBrowserRouter } from "react-router";
import About from "./components/About/About";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Create from "./components/BlogCreate/Create";
import BlogDetail from "./components/BlogDetail/BlogDetail";
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
      { path: "/detail/:id", element: <BlogDetail /> },
      { path: "/signup", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
