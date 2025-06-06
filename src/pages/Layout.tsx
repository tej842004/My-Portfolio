import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router";
import AuthContext from "../auth/context";
import NavBar from "../components/NavBar";
import type { User } from "../entitles/User";

const Layout = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Box maxW="900px" mx="auto" p={4}>
        <NavBar />
        <Outlet />
      </Box>
    </AuthContext.Provider>
  );
};

export default Layout;
