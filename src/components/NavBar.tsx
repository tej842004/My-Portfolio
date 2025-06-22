import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FiHome, FiInfo, FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useAuth from "../auth/useAuth";

const NavBar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginBottom={10}
    >
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <Link to="/">
            <Tooltip hasArrow label="Home">
              <FiHome size={20} />
            </Tooltip>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to="/create">
            <Tooltip hasArrow label="Create blog">
              <FiPlusCircle size={20} />
            </Tooltip>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to="/about">
            <Tooltip hasArrow label="About me">
              <FiInfo size={20} />
            </Tooltip>
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>

      {user && (
        <Menu>
          <MenuButton as={Button} borderRadius="full" size="sm">
            {user.name?.charAt(0)}
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem
                onClick={() => {
                  logOut();
                  toast({
                    title: "Logged out successfully.",
                    description: "You have been logged out of your account.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  navigate("/");
                }}
              >
                LogOut
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default NavBar;
