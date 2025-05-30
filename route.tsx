import { createBrowserRouter } from "react-router";
import About from "./src/components/About";
import BlogDetail from "./src/components/BlogDetail";
import Create from "./src/components/Create";
import HomeLayout from "./src/pages/HomeLayout";
import Layout from "./src/pages/Layout";

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
