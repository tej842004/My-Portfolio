import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Prashant from "../assets/images/prash.jpg";
import useAuth from "../auth/useAuth";
import useBlog from "../hooks/useBlog";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useDeleteImage from "../hooks/useDeleteImage";
import AlertDialogBox from "./AlertDialogBox";

const BlogDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: blog, isLoading, error } = useBlog(id!);
  const { mutateAsync: deleteBlog, isPending: deletingBlog } = useDeleteBlog();
  const { mutateAsync: deleteImage, isPending: deletingImage } =
    useDeleteImage();

  const handleDelete = async () => {
    if (!blog?.imagePublicId || !id) return;

    await deleteImage({ public_id: blog.imagePublicId });

    await deleteBlog(id!, {
      onSuccess: () => navigate("/"),
      onError: (err) => console.log("Delete failed", err),
    });
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

              {user && (
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
