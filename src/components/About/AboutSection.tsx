import { Box, Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const AboutSection = ({ heading, children }: Props) => {
  return (
    <Box width="100%">
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        {heading}
      </Heading>

      {children}
    </Box>
  );
};

export default AboutSection;
