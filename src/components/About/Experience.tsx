import { Stack } from "@chakra-ui/react";
import experience from "../../data/experience";
import AboutLabel from "./AboutLabel";
import AboutSection from "./AboutSection";

const heading = "Experience";

const Experience = () => {
  return (
    <AboutSection heading={heading}>
      <Stack spacing={6} direction="column" align="stretch">
        {experience.map((e) => (
          <AboutLabel {...e} key={e.id} />
        ))}
      </Stack>
    </AboutSection>
  );
};

export default Experience;
