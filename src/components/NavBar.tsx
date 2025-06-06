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
  useColorMode,
} from "@chakra-ui/react";
import { FiFile, FiHome, FiInfo, FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../auth/useAuth";
import ToggleButton from "./ToggleButton";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
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
          <Link to="https://drive.google.com/file/d/1EiZyPYTQ0v98-qkS6ziSsYUi7f6zMdIK/view?usp=sharing">
            <Tooltip hasArrow label="Resume">
              <FiFile size={20} />
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

      {!user ? (
        <ToggleButton />
      ) : (
        <Menu>
          <MenuButton as={Button}>{user.name?.charAt(0)}</MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
              </MenuItem>
              <MenuItem onClick={logOut}>LogOut</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default NavBar;
