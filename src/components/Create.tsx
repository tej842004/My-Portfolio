import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { articles } from "../data/articles";
import { InlineTagInput } from "./InlineTagInput";
import Toolbar from "./Toolbar";
import DropDownMenu from "./GenreSelector";

const TiptapEditor = () => {
  const [tags, setTags] = useState<string[]>([]);

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

  const handleSave = () => {
    if (!bodyEditor || !titleEditor) return;

    // const titlePlainText = titleEditor.getText();
    // const titleHTML = titleEditor.getHTML();

    // const bodyPlainText = bodyEditor.getText();
    // const bodyHTML = bodyEditor.getHTML();

    // console.log(tags)
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
      {/* Title Editor */}
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

      {/* Toolbar */}
      <Toolbar bodyEditor={bodyEditor} />

      {/* Body Editor */}
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

      <DropDownMenu />

      <InlineTagInput tags={tags} setTags={setTags} />

      {/* Submit Button */}
      <Button
        colorScheme="blue"
        onClick={handleSave}
        variant="outline"
        width="100%"
      >
        Submit
      </Button>

      <Box as="section" role="region" aria-label="Latest Posts" marginTop={10}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Text fontSize="2xl" mb={6}>
            Your Last 5 Posts
          </Text>
        </Box>

        {articles.map((article, index) => (
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
        ))}
      </Box>
    </VStack>
  );
};

export default TiptapEditor;
