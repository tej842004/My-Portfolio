import { Box, Text, VStack } from "@chakra-ui/react";
import ShinyText from "../../react-bits/ShinyText/ShinyText";
import Icons from "./Icon";
import ModernAccordion from "./ModernAccordion";
import Skills from "./Skills";

const Testimonial = () => {
  return (
    <VStack spacing={3} alignItems="flex-start" py={10} minHeight="84vh">
      <Text fontSize={{ base: "1xl", md: "2xl" }} color="gray.300">
        Hi, I am Prashant Chauhan
      </Text>
      <Box
        display="flex"
        gap={{ base: 5, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text
          whiteSpace="nowrap"
          fontSize={{ base: "6xl", md: "7xl" }}
          lineHeight="1"
        >
          Full-Stack
          <br />
          Developer
        </Text>

        <Text fontSize={{ base: "1xl", md: "2xl" }} color="gray.300">
          Transforming ideas into interactive and seamless digital experiences
          with cutting-edge{" "}
          <ShinyText
            text="full-stack"
            disabled={false}
            speed={3}
            className="custom-class"
            color="#8F00FF"
          />{" "}
          development.
        </Text>
      </Box>

      <Icons />

      <Skills />

      <ModernAccordion />
    </VStack>
  );
};

export default Testimonial;
