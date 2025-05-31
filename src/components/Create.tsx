import {
  Box,
  Button,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { Link } from "react-router";
import useBlogs from "../hooks/useBlogs";
import useCreateBlog from "../hooks/useCreateBlog";
import useGenre from "../hooks/useGenre";
import usePortfolioQueryStore from "../store";
import GenreSelector from "./GenreSelector";
import { InlineTagInput } from "./InlineTagInput";
import Toolbar from "./Toolbar";

const TiptapEditor = () => {
  const toast = useToast();
  const { mutate, isPending } = useCreateBlog();
  const { data: blogs } = useBlogs();
  const [tags, setTags] = useState<string[]>([]);

  const selectedGenreId = usePortfolioQueryStore(
    (s) => s.portfolioQuery.genreId
  );
  const selectedGenre = useGenre(selectedGenreId);

  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write title</p>",
  });

  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Write something</p>",
  });

  const handleSave = async () => {
    if (!bodyEditor || !titleEditor || !selectedGenre) return;

    mutate({
      title: titleEditor.getText(),
      content: bodyEditor.getText(),
      tags,
      genre: selectedGenre,
    });

    toast({
      title: "Blog created.",
      description: "Your blog has been successfully posted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack
      spacing={4}
      alignItems="flex-start"
      justifyContent="flex-start"
      padding={4}
      paddingLeft={0}
      width="100%"
      maxW={{ base: "100%", md: "700px" }}
      marginTop={10}
    >
      <Box
        borderWidth="1px"
        borderColor="gray.400"
        borderRadius="md"
        padding={8}
        paddingTop={4}
        paddingBottom={4}
        width="100%"
        minHeight="50px"
      >
        <EditorContent editor={titleEditor} />
      </Box>

      <Toolbar bodyEditor={bodyEditor} />

      <Box
        borderWidth="1px"
        borderColor="gray.400"
        borderRadius="md"
        padding={8}
        paddingTop={4}
        width="100%"
        minHeight="250px"
      >
        <EditorContent editor={bodyEditor} />
      </Box>

      <GenreSelector />

      <InlineTagInput tags={tags} setTags={setTags} />

      <Button
        colorScheme="blue"
        onClick={handleSave}
        variant="outline"
        width="100%"
      >
        {isPending ? <Spinner /> : "Submit"}
      </Button>

      <Box as="section" role="region" aria-label="Latest Posts" marginTop={10}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Text fontSize="2xl" mb={6}>
            Your Last 5 Posts
          </Text>
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
    </VStack>
  );
};

export default TiptapEditor;
