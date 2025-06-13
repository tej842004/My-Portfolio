import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import Prashant from "../assets/images/prash.jpg";
import useAuth from "../auth/useAuth";
import useBlog from "../hooks/useBlog";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useDeleteImage from "../hooks/useDeleteImage";
import { convertTipTapToHtml } from "../utils/convertTipTapToHtml";
import formatDate from "../utils/formatDate";
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
            <Heading color="white" fontSize="4xl" lineHeight="short">
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
                <Text
                  color="white"
                  fontWeight="medium"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {typeof blog?.author === "object" && blog.author.name}
                </Text>
                <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                  {blog && formatDate(blog)}
                </Text>
                <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                  · {blog?.readTime} min read
                </Text>
              </HStack>

              {user &&
                user._id ===
                  (typeof blog?.author === "object"
                    ? blog?.author._id
                    : blog?.author) && (
                  <>
                    {/* Responsive button group */}
                    <HStack spacing={3} display={{ base: "none", md: "flex" }}>
                      <Button
                        size="sm"
                        leftIcon={<Icon as={FiEdit2} />}
                        colorScheme="blue"
                        variant="outline"
                        fontWeight="normal"
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        leftIcon={<Icon as={FiTrash2} />}
                        colorScheme="red"
                        variant="outline"
                        onClick={onOpen}
                        fontWeight="normal"
                      >
                        Delete
                      </Button>
                    </HStack>

                    {/* Responsive menu button for small screens */}
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<BsThreeDotsVertical />}
                        variant="ghost"
                        size="sm"
                        aria-label="Options"
                        borderRadius="full"
                        display={{ base: "flex", md: "none" }}
                      />
                      <MenuList shadow="lg" borderRadius="md" py={1}>
                        <MenuItem icon={<Icon as={FiEdit2} boxSize={4} />}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<Icon as={FiTrash2} boxSize={4} />}
                          onClick={onOpen}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </>
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
              color="white"
              lineHeight="tall"
              dangerouslySetInnerHTML={{
                __html: convertTipTapToHtml(blog?.content),
              }}
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
