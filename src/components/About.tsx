import { Box, VStack } from "@chakra-ui/react";
import Blogs from "./About/Blogs";
import Education from "./About/Education";
import Experience from "./About/Experience";
import GetInTouch from "./About/GetInTouch";
import Projects from "./About/Projects";
import Skills from "./About/Skills";
import Testimonial from "./About/Testimonial";

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
