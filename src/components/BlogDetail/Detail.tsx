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
import Prashant from "../../assets/images/prash.jpg";
import useBlog from "../../hooks/Blog/useBlog";
import { convertTipTapToHtml } from "../../utils/convertTipTapToHtml";
import formatDate from "../../utils/formatDate";
import CommentSection from "./CommentSection/CommentSection";

const Detail = () => {
  const { id } = useParams();
  const { data: blog, isLoading: blogLoading, error: blogError } = useBlog(id!);

  if (blogError) return null;

  return (
    <VStack align="stretch" spacing={6} mt={10}>
      {blogLoading && (
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

      {!blogLoading && blog && (
        <>
          <Heading fontSize="4xl" lineHeight="short">
            {blog?.title}
          </Heading>

          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 6, md: 0 }}
          >
            <HStack spacing={2} wrap="wrap">
              <Image
                src={Prashant}
                alt="Author"
                objectFit="cover"
                boxSize="30px"
                borderRadius="full"
              />
              <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                {typeof blog?.author === "object" && blog.author.name}
              </Text>
              <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                {blog && formatDate(blog)}
              </Text>
              <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                · {blog?.readTime} min read
              </Text>
            </HStack>
          </Box>

          <Image
            src={blog?.imageUrl}
            alt="Blog Banner"
            height="100%"
            width="100%"
            objectFit="cover"
            borderRadius="2xl"
          />
          <Box
            lineHeight="tall"
            dangerouslySetInnerHTML={{
              __html: convertTipTapToHtml(blog?.content),
            }}
          />

          <CommentSection blogId={id!} />
        </>
      )}
    </VStack>
  );
};

export default Detail;
