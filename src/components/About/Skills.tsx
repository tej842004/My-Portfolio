import { Badge, Box, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useMemo } from "react";
import skills from "../../data/skills";
import AboutSection from "./AboutSection";

const heading = "Skills";

const scrollLeftInfinite = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRightInfinite = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const Skills = () => {
  const fadeColor = useColorModeValue("white", "gray.900");

  const repeatedSkills = useMemo(() => [...skills, ...skills], []);

  const rows = [
    { animation: `${scrollLeftInfinite} 40s linear infinite` },
    { animation: `${scrollRightInfinite} 50s linear infinite` },
    { animation: `${scrollLeftInfinite} 60s linear infinite` },
  ];

  return (
    <AboutSection heading={heading} position="relative">
      <Box position="relative" overflow="hidden" width="100%">
        {rows.map((row, i) => (
          <Box key={i} position="relative" width="100%" mb={4}>
            <Box
              as="div"
              display="flex"
              whiteSpace="nowrap"
              animation={row.animation}
              _hover={{ animationPlayState: "paused" }}
              width="fit-content"
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
                  mx={2}
                >
                  {skill}
                </Badge>
              ))}
            </Box>

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
    </AboutSection>
  );
};

export default Skills;
