import { Box, Spinner, Text } from "@chakra-ui/react";
import useBlogs from "../../hooks/useBlogs";
import AboutLabel from "./AboutLabel";
import AboutSection from "./AboutSection";

const heading = "Recent Blogs";

const Blogs = () => {
  const { data: blogs, error, isLoading } = useBlogs();

  const isEmpty =
    !isLoading && blogs && blogs.pages.every((page) => page.data.length === 0);

  return (
    <AboutSection heading={heading}>
      {isEmpty && (
        <Box display="flex" justifyContent="center" width="100%">
          <Text color="gray.500">Nothing Found</Text>
        </Box>
      )}

      {isLoading && (
        <Box display="flex" justifyContent="center" width="100%">
          <Spinner />
        </Box>
      )}

      {!isLoading &&
        !error &&
        blogs &&
        blogs?.pages.map((page) =>
          page.data.map((blog, index) => {
            const createdAt = blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Unknown date";

            return (
              <AboutLabel title={blog.title} subtitle={createdAt} key={index} />
            );
          })
        )}
    </AboutSection>
  );
};

export default Blogs;
