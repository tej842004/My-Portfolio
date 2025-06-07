import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Prashant from "../assets/images/prash.jpg";
import useAuth from "../auth/useAuth";
import useBlog from "../hooks/useBlog";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useDeleteImage from "../hooks/useDeleteImage";
import AlertDialogBox from "./AlertDialogBox";

const BlogDetail = () => {
  const toast = useToast();
  const { user } = useAuth();
  const { id } = useParams();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: blog, isLoading, error } = useBlog(id!);
  const { mutateAsync: deleteBlog, isPending: deletingBlog } = useDeleteBlog();
  const { mutateAsync: deleteImage, isPending: deletingImage } =
    useDeleteImage();

  const handleDelete = async () => {
    await deleteBlog(id!, {
      onSuccess: () => {
        toast({
          title: "Blog Deleted",
          description: "The blog has been successfully removed.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      },
      onError: (error: Error) => {
        const err = error as AxiosError;
        toast({
          title: "Failed to delete blog",
          description:
            typeof err.response?.data === "string"
              ? err.response.data
              : JSON.stringify(err.response?.data),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

    if (!blog?.imagePublicId || !id) return;
    await deleteImage({ public_id: blog.imagePublicId });
  };

  if (error) return null;

  return (
    <>
      <VStack align="stretch" spacing={6} mt={10}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
            width="100%"
          >
            <Spinner />
          </Box>
        ) : (
          <>
            <Heading fontSize={{ base: "2xl", md: "4xl" }} lineHeight="short">
              {blog?.title}
            </Heading>

            <Box
              display="flex"
              width="100%"
              flexDirection={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ base: "flex-start", md: "center" }}
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
                <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }}>
                  {typeof blog?.author === "object" && blog.author.name}
                </Text>
                <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
                  {blog?.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : ""}
                </Text>
                <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
                  · {blog?.readTime} min read
                </Text>
              </HStack>

              {user &&
                user._id ===
                  (typeof blog?.author === "object"
                    ? blog?.author._id
                    : blog?.author) && (
                  <HStack>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      fontWeight="normal"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="red"
                      fontWeight="normal"
                      onClick={onOpen}
                    >
                      Delete
                    </Button>
                  </HStack>
                )}
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
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="tall"
              color="gray.250"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />
          </>
        )}
      </VStack>
      <AlertDialogBox
        cancelRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        deletingBlog={deletingBlog}
        deletingImage={deletingImage}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default BlogDetail;
