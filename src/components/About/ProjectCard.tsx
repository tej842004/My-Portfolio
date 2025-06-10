import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router";
import type { Project } from "../../entitles/Project";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Card
      maxW="5xl"
      bg={cardBg}
      boxShadow={cardShadow}
      borderRadius="2xl"
      overflow="hidden"
      _hover={{ transform: "translateY(-5px)", transition: "0.3s ease-in-out" }}
      borderWidth="thin"
      borderStyle="solid"
      borderColor="gray.600"
    >
      <CardBody>
        <Stack spacing={3}>
          <Image src={project.logo} height="25px" width="25px" />
          <Heading size="md">{project.title}</Heading>
          <Text color="gray.300" fontSize="sm">
            {project.description}
          </Text>

          <Wrap>
            {project.techstack.map((ts, idx) => (
              <WrapItem key={idx}>
                <Badge colorScheme="teal" px={2} py={1} borderRadius="md">
                  {ts}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </CardBody>

      <CardFooter>
        <ButtonGroup spacing={3}>
          {project.website && (
            <Link to={project.website} target="_blank">
              <Button
                colorScheme="blue"
                variant="solid"
                size="sm"
                leftIcon={<FiExternalLink />}
              >
                Website
              </Button>
            </Link>
          )}
          {project.github && (
            <Link to={project.github} target="_blank">
              <Button
                colorScheme="gray"
                variant="outline"
                size="sm"
                leftIcon={<FaGithub />}
              >
                GitHub
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
