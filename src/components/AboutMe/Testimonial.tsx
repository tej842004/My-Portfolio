import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Prashant from "../../assets/images/prash.jpg";

const Testimonial = () => {
  const handleScrollToGetInTouch = () => {
    const getInTouchSection = document.getElementById("get-in-touch");
    if (getInTouchSection) {
      getInTouchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = () => {
    window.open(
      "https://drive.google.com/file/d/1wY9sSUEkyHJ7rTx9xui5USzQh4cKjirj/view?usp=drive_link",
      "_blank"
    );
  };

  return (
    <VStack spacing={6} textAlign="center" py={10} marginBottom="15rem">
      <Image
        src={Prashant}
        height="80px"
        width="80px"
        borderRadius="full"
        objectFit="cover"
        alt="Prashant Chauhan"
        boxShadow="md"
      />
      <Heading fontSize={{ base: "2xl", md: "5xl" }}>
        Hi, I'm Prashant Chauhan
      </Heading>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
        fontSize="lg"
      >
        <Text width="100%">
          20, i break things, learn fast, and make shit happen. deep into code
          and cs; anything that pushes the
        </Text>
        <Text width="90%">
          limits. history, curiosity, cricket, and great books shaped me. still
          chasing mastery.
        </Text>
        <Text width="80%">
          If you're working on something real, let's talk.
        </Text>
      </Box>

      <HStack gap={3}>
        <Button
          colorScheme="teal"
          borderRadius="2xl"
          onClick={handleResumeClick}
        >
          Resume
        </Button>
        <Button
          colorScheme="blue"
          borderRadius="2xl"
          onClick={handleScrollToGetInTouch}
        >
          Get in touch
        </Button>
      </HStack>
    </VStack>
  );
};

export default Testimonial;
