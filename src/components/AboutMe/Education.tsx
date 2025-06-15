import educations from "../../data/educations";
import AboutLabel from "./AboutLabel";
import AboutSection from "./AboutSection";
import AboutSectionStack from "./AboutSectionStack";

const heading = "Education";

const Education = () => {
  return (
    <AboutSection heading={heading}>
      <AboutSectionStack>
        {educations.map((e) => (
          <AboutLabel {...e} key={e.id} />
        ))}
      </AboutSectionStack>
    </AboutSection>
  );
};

export default Education;
