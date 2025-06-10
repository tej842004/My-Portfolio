import { Box, VStack } from "@chakra-ui/react";
import Blogs from "./About/Blogs";
import Experience from "./About/Experience";
import Projects from "./About/Projects";
import Testimonial from "./About/Testimonial";
import Skills from "./About/Skills";
import GetInTouch from "./About/GetInTouch";
import Education from "./About/Education";

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
