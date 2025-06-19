import {
  Box,
  Button,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { HiChevronDown } from "react-icons/hi2";
import type { Project } from "../../entities/Project";
import type { FetchResponse } from "../../services/api-client";
import AboutSection from "./AboutSection";
import ProjectCard from "./ProjectCard";

const heading = "Proof of Work";

const Projects = ({
  projectResponse,
}: {
  projectResponse: UseInfiniteQueryResult<
    InfiniteData<FetchResponse<Project>, unknown>,
    Error
  >;
}) => {
  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = projectResponse;

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
