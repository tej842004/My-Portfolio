import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import useBlogs from "../../hooks/useBlogs";

const Blogs = () => {
  const { data: blogs } = useBlogs();

  return (
    <Box width="100%">
      <Heading fontSize="2xl" textAlign="center" marginBottom={5}>
        Recent Blogs
      </Heading>
      {blogs?.pages.map((page) =>
        page.data.map((blog, index) => (
          <Box as="article" key={index}>
            <Link to={`/detail/${blog._id}`}>
              <Heading fontSize="lg">{blog.title}</Heading>
            </Link>

            <Text fontSize="xs" color="gray.500">
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown date"}
            </Text>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Blogs;
