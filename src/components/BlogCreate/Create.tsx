import { Box, Button, useToast, VStack } from "@chakra-ui/react";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { AxiosError } from "axios";
import { useState } from "react";
import useAuth from "../../auth/useAuth";
import useCreateBlog from "../../hooks/Blog/useCreateBlog";
import useGenre from "../../hooks/Genre/useGenre";
import useCreateImage from "../../hooks/Image/useCreateImage";
import usePortfolioQueryStore from "../../store/store";
import CustomEnterExtension from "../../utils/CustomEnterExtension";
import GenreSelector from "./GenreSelector";
import ImageInput from "./ImageInput";
import { InlineTagInput } from "./InlineTagInput";
import Toolbar from "./Toolbar";

const TiptapEditor = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const { isPending: createBlogLoading, mutateAsync: createBlog } =
    useCreateBlog();
  const { mutateAsync: uploadImage, isPending: uploadImageLoading } =
    useCreateImage();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

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
      CustomEnterExtension,
    ],
    content: "<p>Write something</p>",
  });

  const handleSave = async () => {
    try {
      let imageUrl = "";
      let imagePublicId = "";

      if (imageFile) {
        const imageResult = await uploadImage(imageFile);
        imageUrl = imageResult.imageUrl;
        imagePublicId = imageResult.public_id;
      }

      await createBlog({
        title: titleEditor?.getText(),
        content: bodyEditor?.getJSON(),
        tags,
        genreId: selectedGenre?._id,
        imageUrl,
        imagePublicId,
        author: user?._id,
      });

      toast({
        title: "Blog created.",
        description: "Your blog has been successfully posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const err = error as AxiosError;

      toast({
        title: "Error creating blog",
        description:
          typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
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

      <ImageInput onImageChange={setImageFile} />

      <GenreSelector />

      <InlineTagInput tags={tags} setTags={setTags} />

      <Button
        colorScheme="blue"
        onClick={handleSave}
        width="100%"
        isLoading={createBlogLoading || uploadImageLoading}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default TiptapEditor;
