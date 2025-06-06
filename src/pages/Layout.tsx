import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import NavBar from "../components/NavBar";
import type { User } from "../entitles/User";

const Layout = () => {
  const [user, setUser] = useState<User | null>(null);

  const restoreUser = () => {
    const user = authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

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
