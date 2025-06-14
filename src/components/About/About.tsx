import { Box, VStack } from "@chakra-ui/react";
import Blogs from "./Blogs";
import Education from "./Education";
import Experience from "./Experience";
import GetInTouch from "./GetInTouch";
import Projects from "./Projects";
import Skills from "./Skills";
import Testimonial from "./Testimonial";

const About = () => {
  return (
    <Box width="100%" mx="auto">
      <Testimonial />

      <VStack gap="5rem" width="85%" mx="auto">
        <Projects />
        <Blogs />
        <Experience />
        <Skills />
        <Education />
        <GetInTouch />
      </VStack>
    </Box>
  );
};

export default About;
