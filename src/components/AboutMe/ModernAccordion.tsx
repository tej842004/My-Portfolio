import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCircle } from "react-icons/md";
import whatIDo from "../../data/whatIDo";
import LetterGlitch from "../../react-bits/LetterGlitch/LetterGlitch";

const ModernAccordion = () => {
  const fadeColor = useColorModeValue("white", "gray.900");

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="stretch"
      justifyContent="flex-start"
      width="100%"
      gap={8}
      mt={12}
    >
      {/* Accordion Section */}
      <Box flex="1">
        <Text fontSize={{ base: "3xl", md: "4xl" }} mb={5}>
          What I Do?
        </Text>
        <Accordion allowToggle width="100%">
          {whatIDo.map((item, index) => (
            <AccordionItem
              key={index}
              bg="gray.900"
              border="1px"
              borderColor="gray.700"
              rounded="xl"
              mb={4}
              boxShadow="md"
            >
              <h2>
                <AccordionButton px={6} py={4}>
                  <Box
                    flex="1"
                    textAlign="left"
                    display="flex"
                    alignItems="center"
                    gap={3}
                  >
                    <item.icon size="20px" color="#8F00FF" />
                    <Text fontSize="lg" color="gray.300">
                      {item.title}
                    </Text>
                  </Box>
                  <AccordionIcon
                    color="#8F00FF"
                    transition="transform 0.25s ease"
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={6} px={6} color="gray.300">
                <List spacing={3}>
                  {item.points.map((point, idx) => (
                    <ListItem
                      key={idx}
                      display="flex"
                      alignItems="center"
                      fontSize="sm"
                    >
                      <ListIcon as={MdCircle} color="#8F00FF" fontSize="5px" />
                      {point}
                    </ListItem>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>

      <Box
        flex="1"
        minH={{ base: "300px", md: "100%" }}
        overflow="hidden"
        position="relative"
      >
        <LetterGlitch
          glitchColors={["#8F00FF", "#9A13DC", "#B452FF", "#6823C2"]}
          glitchSpeed={30}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />

        {/* Top Blur */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="20px"
          bgGradient={`linear(to-b, ${fadeColor}, transparent)`}
          zIndex="1"
          pointerEvents="none"
        />

        {/* Bottom Blur */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          height="20px"
          bgGradient={`linear(to-t, ${fadeColor}, transparent)`}
          zIndex="1"
          pointerEvents="none"
        />

        {/* Left Blur */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          width="60px"
          bgGradient={`linear(to-r, ${fadeColor}, transparent)`}
          zIndex="1"
          pointerEvents="none"
        />

        {/* Right Blur */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          right="0"
          width="60px"
          bgGradient={`linear(to-l, ${fadeColor}, transparent)`}
          zIndex="1"
          pointerEvents="none"
        />
      </Box>
    </Box>
  );
};

export default ModernAccordion;
