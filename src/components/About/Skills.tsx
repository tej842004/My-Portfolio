// import { Badge, Box, HStack, useColorModeValue } from "@chakra-ui/react";
// import { keyframes } from "@emotion/react";
// import { useMemo } from "react";
// import skills from "../../data/skills";
// import AboutSection from "./AboutSection";

// const heading = "Skills";

// const scrollLeft = keyframes`
//   0% { transform: translateX(0%); }
//   100% { transform: translateX(-100%); } /* Scrolls content left */
// `;

// const scrollRightSeamless = keyframes`
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(0%); }
// `;

// const Skills = () => {
//   const repeatedSkills = useMemo(() => [...skills, ...skills, ...skills], []);
//   const fadeColor = useColorModeValue("white", "gray.900");

//   const rows = [
//     { animation: `${scrollLeft} 120s linear infinite` },
//     { animation: `${scrollRightSeamless} 140s linear infinite -70s` }, // Negative delay to start mid-animation
//     { animation: `${scrollLeft} 160s linear infinite` },
//   ];

//   return (
//     <AboutSection heading={heading} position="relative">
//       <Box position="relative" overflow="hidden" width="100%">
//         {rows.map((row, i) => (
//           <Box
//             key={i}
//             overflow="hidden"
//             position="relative"
//             width="100%"
//             mb={{ base: 2, md: 4 }}
//             _hover={{ cursor: "pointer" }}
//           >
//             <HStack
//               spacing={{ base: 2, md: 4 }}
//               animation={row.animation}
//               _hover={{ animationPlayState: "paused" }}
//               display="inline-flex"
//             >
//               {repeatedSkills.map((skill, idx) => (
//                 <Badge
//                   key={`${skill}-${idx}-${i}`}
//                   colorScheme="teal"
//                   px={{ base: 2, md: 4 }}
//                   py={{ base: 1, md: 2 }}
//                   borderRadius="md"
//                   fontSize={{ base: "xs", md: "md" }}
//                   whiteSpace="nowrap"
//                 >
//                   {skill}
//                 </Badge>
//               ))}
//             </HStack>

//             <Box
//               position="absolute"
//               left={0}
//               top={0}
//               bottom={0}
//               width="60px"
//               bgGradient={`linear(to-r, ${fadeColor}, transparent)`}
//               zIndex={1}
//               pointerEvents="none"
//             />
//             <Box
//               position="absolute"
//               right={0}
//               top={0}
//               bottom={0}
//               width="60px"
//               bgGradient={`linear(to-l, ${fadeColor}, transparent)`}
//               zIndex={1}
//               pointerEvents="none"
//             />
//           </Box>
//         ))}
//       </Box>
//     </AboutSection>
//   );
// };

// export default Skills;
import { Badge, Box, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useMemo } from "react";
import skills from "../../data/skills";
import AboutSection from "./AboutSection";

const heading = "Skills";

// Scroll left infinitely
const scrollLeftInfinite = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Scroll right infinitely (start shifted)
const scrollRightInfinite = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const Skills = () => {
  const fadeColor = useColorModeValue("white", "gray.900");

  // Duplicate skills for seamless scrolling
  const repeatedSkills = useMemo(() => [...skills, ...skills], []);

  // Define each row with animation direction and speed
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

            {/* Fades */}
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
