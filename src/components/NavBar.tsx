import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { Link } from "react-router";
import ToggleButton from "./ToggleButton";

const NavBar = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to="/create">Create</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to="/about">About</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <ToggleButton />
    </Box>
  );
};

export default NavBar;
