import { Badge, Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";

const skills = [
  "JavaScript",
  "Typescript",
  "Next.js",
  "React",
  "Prisma",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "MySQL",
  "Turborepo",
  "Docker",
  "AWS",
  "Redux",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "Git",
];

const Skills = () => {
  return (
    <Box width="100%">
      <Heading fontSize="2xl" marginBottom={5} textAlign="center">
        Skills
      </Heading>
      <Wrap justify="center">
        {skills.map((skill, index) => (
          <WrapItem key={index}>
            <Badge colorScheme="teal" px={2} py={1} borderRadius="md">
              {skill}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default Skills;
