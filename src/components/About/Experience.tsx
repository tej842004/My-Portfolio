import { Box, Heading, Text } from "@chakra-ui/react";

const Experience = () => {
  return (
    <Box width="100%">
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        Experiences
      </Heading>
      <Box
        display="flex"
        justifyContent={{ base: "unset", md: "space-between" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <Heading fontSize="lg">Full-Stack Developer</Heading>
          <Text fontSize="xs" color="gray.500">
            Nth Cloud LLP
          </Text>
        </Box>
        <Text fontSize="xs">May 2025 - present</Text>
      </Box>
    </Box>
  );
};

export default Experience;
