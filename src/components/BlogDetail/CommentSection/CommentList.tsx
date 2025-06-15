import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import Prashant from "../../../assets/images/prash.jpg";
import useDeleteComment from "../../../hooks/Comment/useDeleteComment";
import useGetComment from "../../../hooks/Comment/useGetComments";
import useAuth from "../../../auth/useAuth";

const CommentList = ({ blogId }: { blogId: string }) => {
  const { user } = useAuth();
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    hasNextPage,
    fetchNextPage,
  } = useGetComment(blogId);

  const { mutateAsync: deleteComment } = useDeleteComment();

  const isEmpty =
    !commentsLoading &&
    comments &&
    comments.pages.every((page) => page.data.length === 0);

  const fetchCommentCount =
    comments?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  if (commentsError) return null;

  return (
    <>
      {isEmpty && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text>Nothing Found</Text>
        </Box>
      )}

      {commentsLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Spinner />
        </Box>
      )}

      {!commentsLoading && !commentsError && comments && (
        <InfiniteScroll
          dataLength={fetchCommentCount}
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
          <VStack align="stretch" spacing={4}>
            {comments?.pages.map((page) =>
              page.data.map((comment) => (
                <HStack
                  key={comment._id}
                  align="flex-start"
                  spacing={3}
                  p={4}
                  rounded="lg"
                >
                  <Avatar src={Prashant} size="sm" />
                  <Box flex="1">
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{comment.user?.name}</Text>
                      {user?._id === comment.user?._id && (
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<BsThreeDotsVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<MdEdit />}
                              onClick={() => console.log("edit")}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={<MdDelete />}
                              onClick={async () => {
                                try {
                                  await deleteComment(comment._id);
                                } catch (error) {
                                  console.error(error);
                                }
                              }}
                              color="red.400"
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      )}
                    </HStack>
                    <Text>{comment.comment}</Text>
                  </Box>
                </HStack>
              ))
            )}
          </VStack>
        </InfiniteScroll>
      )}
    </>
  );
};

export default CommentList;
