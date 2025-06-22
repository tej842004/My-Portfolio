import {
  Box,
  HStack,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
import Particles from "../../react-bits/Particles/Particles";
import ShinyText from "../../react-bits/ShinyText/ShinyText";
import Skills from "./Skills";

const Testimonial = () => {
  return (
    <Box position="relative" w="full" minH="84vh" overflow="hidden">
      <Box position="absolute" inset={0} zIndex={-1}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </Box>
      <VStack spacing={3} alignItems="flex-start" py={10}>
        <Text fontSize={{ base: "xl", md: "2xl" }} color="gray.300">
          Hi, I am Prashant Chauhan
        </Text>
        <Box
          display="flex"
          gap={{ base: 5, md: 10 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Text
            color="gray.200"
            whiteSpace="nowrap"
            fontSize={{ base: "5xl", md: "7xl" }}
            lineHeight="1"
          >
            Full-Stack
            <br />
            Developer
          </Text>

          <Text fontSize={{ base: "xl", md: "2xl" }} color="gray.300">
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
      </VStack>
    </Box>
  );
};

export default Testimonial;

const Icons = () => {
  const handleScrollToGetInTouch = () => {
    const getInTouchSection = document.getElementById("get-in-touch");
    if (getInTouchSection) {
      getInTouchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = () => {
    window.open(
      "https://drive.google.com/file/d/1Evfa2dJl6uEtscglnDDuqQn3SS17xwxk/view?usp=drive_link",
      "_blank"
    );
  };

  return (
    <HStack gap={3} mt={10}>
      <Tooltip label="GitHub" hasArrow>
        <IconButton
          as="a"
          href="https://github.com/tej842004"
          target="_blank"
          aria-label="GitHub"
          icon={<FaGithub size={28} />}
          variant="ghost"
          size="lg"
          isRound
          color="gray.300"
        />
      </Tooltip>

      <Tooltip label="LinkedIn" hasArrow>
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/prashant-chauhan-386b14264/"
          target="_blank"
          aria-label="LinkedIn"
          icon={<FaLinkedin size={28} />}
          variant="ghost"
          size="lg"
          isRound
          color="gray.300"
        />
      </Tooltip>

      <Tooltip label="Resume" hasArrow>
        <IconButton
          as="a"
          aria-label="Resume"
          icon={<HiOutlineDocumentText size={28} />}
          variant="ghost"
          size="lg"
          isRound
          color="gray.300"
          onClick={handleResumeClick}
        />
      </Tooltip>

      <Tooltip label="Get in Touch" hasArrow>
        <IconButton
          onClick={handleScrollToGetInTouch}
          aria-label="Get in Touch"
          icon={<MdMailOutline size={28} />}
          variant="ghost"
          size="lg"
          isRound
          color="gray.300"
        />
      </Tooltip>
    </HStack>
  );
};
