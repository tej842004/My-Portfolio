import { Box, Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  id?: string;
  heading: string;
  children: ReactNode;
}

const AboutSection = ({ id, heading, children }: Props) => {
  return (
    <Box width="100%" id={id}>
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        {heading}
      </Heading>

      {children}
    </Box>
  );
};

export default AboutSection;
