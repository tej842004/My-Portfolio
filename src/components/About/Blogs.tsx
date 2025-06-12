import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import useBlogs from "../../hooks/useBlogs";
import formatDate from "../../utils/formatDate";
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

      {!isLoading && !error && blogs && (
        <Stack spacing={6} direction="column" align="stretch">
          {blogs.pages.map((page) =>
            page.data.map((blog, index) => {
              const createdAt = formatDate(blog);
              return (
                <AboutLabel
                  key={index}
                  title={blog.title}
                  subtitle={createdAt}
                />
              );
            })
          )}
        </Stack>
      )}
    </AboutSection>
  );
};

export default Blogs;
