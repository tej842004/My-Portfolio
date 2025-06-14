import {
  Box,
  Button,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi2";
import useProjects from "../../hooks/Project/useProjects";
import AboutSection from "./AboutSection";
import ProjectCard from "./ProjectCard";

const heading = "Proof of Work";

const Projects = () => {
  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useProjects();

  const isEmpty =
    !isLoading &&
    projects &&
    projects.pages.every((page) => page.data.length === 0);

  return (
    <AboutSection heading={heading}>
      {isEmpty && (
        <Box display="flex" justifyContent="center" width="100%">
          <Text color="gray.500">Nothing Found</Text>
        </Box>
      )}

      {isLoading && (
        <Box display="flex" justifyContent="center" width="100%">
          <Spinner />
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {!isLoading &&
          !error &&
          projects &&
          projects?.pages.map((page) =>
            page.data.map((project) => (
              <ProjectCard project={project} key={project._id} />
            ))
          )}
      </SimpleGrid>
      {hasNextPage && (
        <VStack mt={8}>
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            variant="outline"
            size="xs"
            rightIcon={<HiChevronDown />}
          >
            Load More
          </Button>
        </VStack>
      )}
    </AboutSection>
  );
};

export default Projects;
