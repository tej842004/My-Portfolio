import {
  Box,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import Prashant from "../assets/images/prash.jpg";
import RCB from "../assets/images/rcb.webp";
import useBlog from "../hooks/useBlog";

const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useBlog(id!);

  if (error) return null;

  return (
    <VStack align="stretch" spacing={6} mt={10}>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          width="100%"
        >
          <Spinner />
        </Box>
      ) : (
        <>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} lineHeight="short">
            {blog?.title}
          </Heading>

          <HStack spacing={2} wrap="wrap">
            <Image
              src={Prashant}
              alt="Author"
              objectFit="cover"
              boxSize="30px"
              borderRadius="full"
            />
            <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }}>
              {blog?.author}
            </Text>
            <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
              {blog?.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : ""}
            </Text>
            <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
              · {blog?.readTime} min read
            </Text>
          </HStack>

          <Image
            src={RCB}
            alt="Blog Banner"
            height="100%"
            width="100%"
            objectFit="cover"
            borderRadius="2xl"
          />

          <VStack spacing={4} align="stretch">
            <Text
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="tall"
              color="gray.250"
            >
              {blog?.content}
            </Text>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default BlogDetail;
