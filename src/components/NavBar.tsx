import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, Tooltip } from "@chakra-ui/react";
import { FiHome, FiInfo, FiPlusCircle } from "react-icons/fi"; // Feather Icons
import { Link } from "react-router";
import ToggleButton from "./ToggleButton";
import { FiFile } from "react-icons/fi";

const NavBar = () => {
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

      <ToggleButton />
    </Box>
  );
};

export default NavBar;
