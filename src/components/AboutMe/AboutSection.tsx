import { Box, Heading, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props extends BoxProps {
  id?: string;
  heading: string;
  children: ReactNode;
}

const AboutSection = ({ id, heading, children, ...rest }: Props) => {
  return (
    <Box width="100%" id={id} {...rest}>
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        {heading}
      </Heading>

      {children}
    </Box>
  );
};

export default AboutSection;
