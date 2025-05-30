import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { articles } from "../data/articles";
import SearchInput from "./SearchInput";

const Main = () => {
  return (
    <Box as="section" role="region" aria-label="Latest Posts" marginTop={10}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Text fontSize="2xl" mb={6}>
          Latest Posts
        </Text>
        <SearchInput />
      </Box>

      {articles.map((article, index) => (
        <Link to="/detail">
          <Box as="article" key={index} mb={8} maxW="700px">
            <Heading as="h2" size="lg" mb={2}>
              {article.title}
            </Heading>
            <Text mb={4} noOfLines={1} color="gray.500" fontWeight="normal">
              {article.body}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              gap={6}
              fontSize="sm"
              color="gray.500"
            >
              {article.date && (
                <Text as="time" dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString()}
                </Text>
              )}
              {article.readingTime && <Text>{article.readingTime}</Text>}
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Main;
