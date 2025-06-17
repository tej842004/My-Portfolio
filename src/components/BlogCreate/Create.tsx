import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { EditorContent } from "@tiptap/react";
import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import type { Blog } from "../../entitles/Blog";
import useCreateBlog from "../../hooks/Blog/useCreateBlog";
import useDeleteBlog from "../../hooks/Blog/useDeleteBlog";
import useHandleBlogSubmission from "../../hooks/Blog/useHandleBlogSubmission";
import useHandleBlogDeletion from "../../hooks/Blog/User/useHandleBlogDeletion";
import useUserBlogs from "../../hooks/Blog/User/useUserBlogs";
import useTipTapEditor from "../../hooks/Blog/useTipTapEditor";
import useUpdateBlog from "../../hooks/Blog/useUpdateBlog";
import useGenre from "../../hooks/Genre/useGenre";
import useCreateImage from "../../hooks/Image/useCreateImage";
import useDeleteImage from "../../hooks/Image/useDeleteImage";
import usePortfolioQueryStore from "../../store/store";
import AlertDialogBox from "../AlertDialogBox";
import GenreSelector from "./GenreSelector";
import ImageInput from "./ImageInput";
import { InlineTagInput } from "./InlineTagInput";
import Toolbar from "./Toolbar";

const Create = () => {
  const cancelRef = useRef(null);
  const [tags, setTags] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { titleEditor, bodyEditor } = useTipTapEditor();
  const [selectedPost, setSelectedPost] = useState<Blog>({} as Blog);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>(undefined);
  const [initialImage, setInitialImage] = useState<string | undefined>(
    undefined
  );
  const { mutateAsync: createBlog, isPending: createBlogLoading } =
    useCreateBlog();
  const { mutateAsync: updateBlog, isPending: updateBlogLoading } =
    useUpdateBlog();
  const { mutateAsync: deleteUserPost, isPending: deletingUserPostLoading } =
    useDeleteBlog();
  const { mutateAsync: uploadImage, isPending: uploadImageLoading } =
    useCreateImage();
  const { mutateAsync: deleteImage, isPending: deletingImageLoading } =
    useDeleteImage();

  const {
    data: blogs,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useUserBlogs();

  const isEmpty =
    !isLoading && blogs && blogs.pages.every((page) => page.data.length === 0);

  const fetchBlogCount =
    blogs?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  const { handleSave } = useHandleBlogSubmission({
    titleEditor,
    bodyEditor,
    createBlog,
    imageFile,
    setImageFile,
    setTags,
    tags,
    uploadImage,
    editingBlog,
    deleteImage,
    updateBlog,
  });

  const { handleDelete } = useHandleBlogDeletion({
    deleteImage,
    deleteUserPost,
    onClose,
    selectedPost,
  });

  const selectedGenreId = usePortfolioQueryStore(
    (s) => s.portfolioQuery.genreId
  );
  const setSelectedGenreId = usePortfolioQueryStore((s) => s.setGenreId);
  const selectedGenre = useGenre(selectedGenreId);

  const handleEdit = (blog: Blog) => {
    setTags(blog.tags!);
    setEditingBlog(blog);
    titleEditor?.commands.setContent(blog.title!);
    bodyEditor?.commands.setContent(blog.content!);
    setInitialImage(blog.imageUrl);
    setSelectedGenreId(
      typeof blog.genre === "object" ? blog.genre._id : blog.genre
    );
  };

  if (error) return null;

  return (
    <>
      <VStack
        spacing={4}
        alignItems="flex-start"
        justifyContent="flex-start"
        padding={4}
        paddingLeft={0}
        width="100%"
        maxW={{ base: "100%", md: "700px" }}
        marginBottom={10}
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

        <ImageInput onImageChange={setImageFile} initialImage={initialImage} />

        <GenreSelector
          selectedGenre={selectedGenre}
          setSelectedGenreId={setSelectedGenreId}
        />

        <InlineTagInput tags={tags} setTags={setTags} />

        <Button
          colorScheme="blue"
          onClick={handleSave}
          width="100%"
          isLoading={
            createBlogLoading ||
            updateBlogLoading ||
            deletingImageLoading ||
            uploadImageLoading
          }
        >
          {editingBlog ? "Update" : "Submit"}
        </Button>
      </VStack>

      <Box as="section" role="region" aria-label="Latest Posts">
        <Text fontSize="2xl" mb={6}>
          Your Posts
        </Text>

        {isEmpty && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text color="gray.500">Nothing Found</Text>
          </Box>
        )}

        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Spinner />
          </Box>
        )}

        {!isLoading && !error && blogs && (
          <InfiniteScroll
            dataLength={fetchBlogCount}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage()}
            loader={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginY="5px"
              >
                <Spinner />
              </Box>
            }
          >
            {blogs.pages.map((page) =>
              page.data.map((blog, index) => {
                return (
                  <HStack
                    justify="space-between"
                    align="flex-start"
                    mb={8}
                    key={index}
                  >
                    <Box as="article">
                      <Link to={`/detail/${blog._id}`}>
                        <Heading as="h2" size="lg" mb={1}>
                          {blog.title}
                        </Heading>
                        <Text fontSize="md" color="gray.500">
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString()
                            : "Unknown date"}
                        </Text>
                      </Link>
                    </Box>

                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<BsThreeDotsVertical />}
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem
                          icon={<FiEdit />}
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<FiTrash2 />}
                          onClick={() => {
                            setSelectedPost(blog);
                            onOpen();
                          }}
                          color="red.500"
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                );
              })
            )}
          </InfiniteScroll>
        )}
      </Box>
      <AlertDialogBox
        cancelRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isLoading={deletingUserPostLoading || deletingImageLoading}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Create;
