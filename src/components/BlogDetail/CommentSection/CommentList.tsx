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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import Prashant from "../../../assets/images/prash.jpg";
import useAuth from "../../../auth/useAuth";
import type Comment from "../../../entitles/Comment";
import useComment from "../../../hooks/Comment/useComment";
import useDeleteComment from "../../../hooks/Comment/useDeleteComment";
import type { FetchResponse } from "../../../services/api-client";
import AlertDialogBox from "../../AlertDialogBox";

type FetchNextPageFn = (
  options?: FetchNextPageOptions
) => Promise<
  InfiniteQueryObserverResult<InfiniteData<FetchResponse<Comment>>, Error>
>;

interface Props {
  comments?: InfiniteData<FetchResponse<Comment>>;
  commentsLoading: boolean;
  commentsError?: Error | null;
  hasNextPage: boolean;
  fetchNextPage: FetchNextPageFn;
  fetchCommentCount: number;
  isEmpty: boolean | undefined;
}

const CommentList = ({
  comments,
  commentsLoading,
  commentsError,
  hasNextPage,
  fetchNextPage,
  fetchCommentCount,
  isEmpty,
}: Props) => {
  const { user } = useAuth();
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const { mutateAsync: deleteComment, isPending: deleteCommentLoading } =
    useDeleteComment();
  const { handleDelete } = useComment({
    deleteComment,
    onClose,
    setSelectedCommentId,
  });

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
                              onClick={() => {
                                setSelectedCommentId(comment._id);
                                onOpen();
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
                  <AlertDialogBox
                    isOpen={isOpen}
                    cancelRef={cancelRef}
                    isLoading={deleteCommentLoading}
                    onConfirm={() => handleDelete(selectedCommentId!)}
                    onClose={onClose}
                  />
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
