import { Box, Flex } from "@chakra-ui/react";
import LetterGlitch from "../../react-bits/LetterGlitch/LetterGlitch";
import ModernAccordion from "./ModernAccordion"; // assuming your accordion is extracted

export default function GlitchAndAccordionSection() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="stretch"
      gap={8}
      px={{ base: 4, md: 16 }}
      py={12}
    >
      {/* Accordion Section */}
      <Box flex="1">
        <ModernAccordion />
      </Box>

      {/* Letter Glitch Canvas */}
      <Box
        flex="1"
        height={{ base: "300px", md: "auto" }}
        minH={{ md: "500px" }}
        borderRadius="xl"
        overflow="hidden"
        position="relative"
      >
        <LetterGlitch
          glitchColors={["#8F00FF", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </Box>
    </Flex>
  );
}
