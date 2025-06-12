import {
  Badge,
  Box,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useMemo } from "react";
import skills from "../../data/skills";

// Keyframes
const scrollLeft = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); } /* Scrolls content left */
`;

// This is the correct keyframe for a seamless infinite scroll to the right
// It starts with the content shifted left (-100%) so that when it scrolls to 0%,
// the duplicated content provides a seamless loop.
const scrollRightSeamless = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0%); }
`;

const Skills = () => {
  const repeatedSkills = useMemo(() => [...skills, ...skills, ...skills], []);
  const fadeColor = useColorModeValue("white", "gray.900");

  const rows = [
    { animation: `${scrollLeft} 120s linear infinite` },
    // **CHANGE HERE: Add a negative animation delay**
    { animation: `${scrollRightSeamless} 140s linear infinite -70s` }, // Negative delay to start mid-animation
    { animation: `${scrollLeft} 160s linear infinite` },
  ];

  return (
    <Box width="100%" position="relative" py={6}>
      <Heading fontSize="2xl" mb={6} textAlign="center">
        Skills
      </Heading>

      <Box position="relative" overflow="hidden" width="100%">
        {/* Three rows */}
        {rows.map((row, i) => (
          <Box
            key={i}
            overflow="hidden"
            position="relative"
            width="100%"
            mb={4}
            _hover={{ cursor: "pointer" }}
          >
            <HStack
              spacing={4}
              animation={row.animation}
              _hover={{ animationPlayState: "paused" }}
              display="inline-flex"
            >
              {repeatedSkills.map((skill, idx) => (
                <Badge
                  key={`${skill}-${idx}-${i}`}
                  colorScheme="teal"
                  px={{ base: 2, md: 4 }}
                  py={{ base: 1, md: 2 }}
                  borderRadius="md"
                  fontSize={{ base: "xs", md: "md" }}
                  whiteSpace="nowrap"
                >
                  {skill}
                </Badge>
              ))}
            </HStack>

            {/* Left fade */}
            <Box
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              width="60px"
              bgGradient={`linear(to-r, ${fadeColor}, transparent)`}
              zIndex={1}
              pointerEvents="none"
            />
            {/* Right fade */}
            <Box
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              width="60px"
              bgGradient={`linear(to-l, ${fadeColor}, transparent)`}
              zIndex={1}
              pointerEvents="none"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
