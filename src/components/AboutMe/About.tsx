import { Box, Spinner, VStack } from "@chakra-ui/react";
import useBlogs from "../../hooks/Blog/useBlogs";
import useProjects from "../../hooks/Project/useProjects";
import Blogs from "./Blogs";
import Education from "./Education";
import Experience from "./Experience";
import GetInTouch from "./GetInTouch";
import Projects from "./Projects";
import Skills from "./Skills";
import Testimonial from "./Testimonial";

const About = () => {
  const projectResponse = useProjects();
  const blogResponse = useBlogs();

  const { isLoading: projectLoading } = projectResponse;
  const { isLoading: blogLoading } = blogResponse;

  return (
    <Box width="100%" mx="auto">
      {projectLoading ||
        (blogLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
            width="100%"
          >
            <Spinner />
          </Box>
        ))}

      {!projectLoading && !blogLoading && (
        <>
          <Testimonial />

          <VStack gap="5rem" width="85%" mx="auto">
            <Projects projectResponse={projectResponse} />
            <Blogs blogsResponse={blogResponse} />
            <Experience />
            <Skills />
            <Education />
            <GetInTouch />
          </VStack>
        </>
      )}
    </Box>
  );
};

export default About;
