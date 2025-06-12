import { Box, Spinner, Text } from "@chakra-ui/react";
import useBlogs from "../../hooks/useBlogs";
import formatDate from "../../utils/formatDate";
import AboutLabel from "./AboutLabel";
import AboutSection from "./AboutSection";
import AboutSectionStack from "./AboutSectionStack";

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
        <AboutSectionStack>
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
        </AboutSectionStack>
      )}
    </AboutSection>
  );
};

export default Blogs;
