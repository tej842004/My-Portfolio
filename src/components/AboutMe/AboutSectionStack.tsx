import { Stack } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AboutSectionStack = ({ children }: Props) => {
  return (
    <Stack spacing={6} direction="column" align="stretch">
      {children}
    </Stack>
  );
};

export default AboutSectionStack;
