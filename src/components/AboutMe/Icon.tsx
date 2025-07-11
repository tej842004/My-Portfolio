import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdMailOutline } from "react-icons/md";

const Icons = () => {
  const handleScrollToGetInTouch = () => {
    const getInTouchSection = document.getElementById("get-in-touch");
    if (getInTouchSection) {
      getInTouchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = () => {
    window.open(
      "https://drive.google.com/file/d/1M5sb02PoU_XeISwt3gqV_pcPcy-h7ECy/view?usp=sharing",
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
          color="gray.500"
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
          color="gray.500"
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
          color="gray.500"
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
          color="gray.500"
        />
      </Tooltip>
    </HStack>
  );
};

export default Icons;
