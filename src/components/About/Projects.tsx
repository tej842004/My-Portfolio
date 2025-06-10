import { Box, Button, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import { HiChevronDown } from "react-icons/hi2";

const Projects = () => {
  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjects();

  return (
    <Box width="100%">
      <Heading fontSize="2xl" marginBottom={5} textAlign="center">
        Proof of Work
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {projects?.pages.map((page) =>
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
    </Box>
  );
};

export default Projects;
