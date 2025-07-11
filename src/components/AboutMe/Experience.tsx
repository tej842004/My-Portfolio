import experience from "../../data/experience";
import AboutLabel from "./AboutLabel";
import AboutSection from "./AboutSection";
import AboutSectionStack from "./AboutSectionStack";

const heading = "Experience";

const Experience = () => {
  return (
    <AboutSection heading={heading}>
      <AboutSectionStack>
        {[...experience].reverse().map((e) => (
          <AboutLabel {...e} key={e.id} />
        ))}
      </AboutSectionStack>
    </AboutSection>
  );
};

export default Experience;
