import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <Box maxW="900px" mx="auto" p={4}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
