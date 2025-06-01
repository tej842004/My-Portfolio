import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import useBlogs from "../hooks/useBlogs";
import SearchInput from "./SearchInput";

const Home = () => {
  const { data: blogs, isLoading, error } = useBlogs();

  if (error) return null;

  return (
    <Box as="section" role="region" aria-label="Latest Posts" marginTop={10}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Text fontSize="2xl" mb={6}>
          Latest Posts
        </Text>
        <SearchInput />
      </Box>

      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          width="100%"
        >
          <Spinner />
        </Box>
      )}

      {!isLoading &&
        blogs?.map((blog, index) => (
          <Box as="article" key={index} mb={8} maxW="700px">
            <Link to={`/detail/${blog._id}`}>
              <Heading as="h2" size="lg" mb={2}>
                {blog.title}
              </Heading>
            </Link>

            <Box
              mb={4}
              noOfLines={1}
              color="gray.500"
              fontWeight="normal"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />

            <Box
              display="flex"
              alignItems="center"
              gap={6}
              fontSize="sm"
              color="gray.500"
            >
              <Text>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </Text>
              <Text>{blog.readTime} min read</Text>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default Home;
