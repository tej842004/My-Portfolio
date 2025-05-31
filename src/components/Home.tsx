import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import useBlogs from "../hooks/useBlogs";
import SearchInput from "./SearchInput";

const Home = () => {
  const { data: blogs } = useBlogs();

  return (
    <Box as="section" role="region" aria-label="Latest Posts" marginTop={10}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Text fontSize="2xl" mb={6}>
          Latest Posts
        </Text>
        <SearchInput />
      </Box>

      {blogs?.map((blog, index) => (
        <Box as="article" key={index} mb={8} maxW="700px">
          <Link to={`/detail/${blog._id}`}>
            <Heading as="h2" size="lg" mb={2}>
              {blog.title}
            </Heading>
          </Link>
          <Text mb={4} noOfLines={1} color="gray.500" fontWeight="normal">
            {blog.content}
          </Text>
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
