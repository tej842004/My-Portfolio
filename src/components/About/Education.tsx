import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import Parul_University from "../../assets/images/parul_university.jpg";

const Education = () => {
  return (
    <Box width="100%">
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        Education
      </Heading>
      <Box
        display="flex"
        justifyContent={{ base: "unset", md: "space-between" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <HStack gap={3}>
            <Image
              src={Parul_University}
              height="50px"
              width="50px"
              borderRadius="full"
            />
            <Box>
              <Heading fontSize="lg">Computer Science & Engineering</Heading>
              <Text fontSize="xs" color="gray.500">
                Parul University
              </Text>
            </Box>
          </HStack>
        </Box>
        <Text marginLeft={{ base: "3.8rem" }} fontSize="xs">
          Expected July 2026
        </Text>
      </Box>
    </Box>
  );
};

export default Education;
