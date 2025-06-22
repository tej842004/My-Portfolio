import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useMemo } from "react";
import skills from "../../data/skills";

const scrollLeftInfinite = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Skills = () => {
  const fadeColor = useColorModeValue("white", "gray.900");
  const cardBg = useColorModeValue("gray.100", "gray.800");

  const repeatedSkills = useMemo(() => [...skills, ...skills], []);

  return (
    <Box position="relative" overflow="hidden" width="100%" mt={10}>
      <Box position="relative" width="100%" mb={4}>
        <Box
          display="flex"
          whiteSpace="nowrap"
          animation={`${scrollLeftInfinite} 40s linear infinite`}
          _hover={{ animationPlayState: "paused" }}
          width="fit-content"
        >
          {repeatedSkills.map((skill, idx) => (
            <Box
              key={`${skill.title}-${idx}`}
              mx={3}
              px={{ base: 3, md: 4 }}
              py={2}
              bg={cardBg}
              borderRadius="xl"
              boxShadow="sm"
              display="inline-flex"
              alignItems="center"
              gap={2}
              minW="fit-content"
              transition="all 0.2s"
              _hover={{ boxShadow: "md", transform: "scale(1.05)" }}
            >
              <Image
                src={skill.src}
                alt={skill.title}
                boxSize="30px"
                objectFit="contain"
              />
              <Text fontSize="xl">{skill.title}</Text>
            </Box>
          ))}
        </Box>

        {/* Fading Edges */}
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
    </Box>
  );
};

export default Skills;
