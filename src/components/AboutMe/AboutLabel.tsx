import { Box, Heading, Image, Text } from "@chakra-ui/react";
import type Label from "../../entitles/Label";

const AboutLabel = ({ image, title, subtitle, date }: Label) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ md: "center" }}
      gap={4}
    >
      {image && (
        <Image
          src={image}
          height="40px"
          width="40px"
          borderRadius="full"
          objectFit="cover"
        />
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        width="100%"
      >
        <Box>
          <Heading fontSize="md">{title}</Heading>
          <Text fontSize="sm" color="gray.500">
            {subtitle}
          </Text>
        </Box>

        {date && (
          <Text fontSize="sm" mt={{ base: 2, md: 0 }}>
            {date}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default AboutLabel;
