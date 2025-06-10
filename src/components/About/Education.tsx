import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Parul_University from "../../assets/images/parul_university.jpg";
import Don_Bosco from "../../assets/images/Don Bosco.jpg";

const Education = () => {
  return (
    <Box width="100%">
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        Education
      </Heading>

      <HStack marginBottom={5}>
        <Image
          src={Parul_University}
          height="40px"
          width="40px"
          borderRadius="full"
        />

        <Box
          display="flex"
          justifyContent={{ base: "unset", md: "space-between" }}
          flexDirection={{ base: "column", md: "row" }}
          width="100%"
        >
          <Box>
            <Heading fontSize="lg">Computer Science & Engineering</Heading>
            <Text fontSize="xs" color="gray.500">
              Parul University
            </Text>
          </Box>

          <Text fontSize="xs">Expected July 2026</Text>
        </Box>
      </HStack>

      <HStack>
        <Image src={Don_Bosco} height="40px" width="40px" borderRadius="full" />

        <Box
          display="flex"
          justifyContent={{ base: "unset", md: "space-between" }}
          flexDirection={{ base: "column", md: "row" }}
          width="100%"
        >
          <Box>
            <Heading fontSize="lg">Higher Secondary</Heading>
            <Text fontSize="xs" color="gray.500">
              Don Bosco High School
            </Text>
          </Box>

          <Text fontSize="xs">2021 - 2022</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Education;
