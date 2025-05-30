import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import "./editor.css";

const AdvancedEditor = () => {
  const [title, setTitle] = useState("");
  const toast = useToast();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
  });

  const handleSubmit = () => {
    const content = editor?.getHTML() || "";
    console.log("Title:", title);
    console.log("Body:", content);
    toast({
      title: "Blog Submitted",
      description: "Content has been logged to console.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!editor) return null;

  return (
    <Box width="100%" mt={8}>
      <VStack spacing={6} align="stretch">
        <Input
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="lg"
          color="gray.700"
        />

        <Flex wrap="wrap" gap={2}>
          <IconButton
            icon={<FaBold />}
            aria-label="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            colorScheme={editor.isActive("bold") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaItalic />}
            aria-label="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            colorScheme={editor.isActive("italic") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaUnderline />}
            aria-label="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            colorScheme={editor.isActive("underline") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaStrikethrough />}
            aria-label="Strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            colorScheme={editor.isActive("strike") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaHeading />}
            aria-label="Heading"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            colorScheme={
              editor.isActive("heading", { level: 2 }) ? "teal" : "gray"
            }
          />
          <IconButton
            icon={<FaListUl />}
            aria-label="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            colorScheme={editor.isActive("bulletList") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaListOl />}
            aria-label="Ordered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            colorScheme={editor.isActive("orderedList") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaQuoteRight />}
            aria-label="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            colorScheme={editor.isActive("blockquote") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaCode />}
            aria-label="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            colorScheme={editor.isActive("codeBlock") ? "teal" : "gray"}
          />
          <IconButton
            icon={<FaUndo />}
            aria-label="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          />
          <IconButton
            icon={<FaRedo />}
            aria-label="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          />
        </Flex>

        <Box
          borderWidth="thin"
          borderColor="gray.700"
          borderRadius="md"
          p={3}
          minH="200px"
        >
          <EditorContent
            editor={editor}
            placeholder="Write your blog content here..."
          />
        </Box>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit Blog
        </Button>
      </VStack>
    </Box>
  );
};

export default AdvancedEditor;
