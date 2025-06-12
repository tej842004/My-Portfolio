import { Stack } from "@chakra-ui/react";
import educations from "../../data/educations";
import AboutLabel from "./AboutLabel";
import AboutSection from "./AboutSection";

const heading = "Education";

const Education = () => {
  return (
    <AboutSection heading={heading}>
      <Stack spacing={6} direction="column" align="stretch">
        {educations.map((e) => (
          <AboutLabel {...e} key={e.id} />
        ))}
      </Stack>
    </AboutSection>
  );
};

export default Education;
