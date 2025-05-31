import { createBrowserRouter } from "react-router";
import About from "./components/About";
import BlogDetail from "./components/BlogDetail";
import Create from "./components/Create";
import HomeLayout from "./pages/HomeLayout";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeLayout /> },
      { path: "/create", element: <Create /> },
      { path: "/about", element: <About /> },
      { path: "/detail", element: <BlogDetail /> },
    ],
  },
]);

export default router;
