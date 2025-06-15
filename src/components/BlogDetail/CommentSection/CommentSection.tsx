import { Box, Text } from "@chakra-ui/react";
import useGetComment from "../../../hooks/Comment/useGetComments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = ({ blogId }: { blogId: string }) => {
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    hasNextPage,
    fetchNextPage,
  } = useGetComment(blogId);

  const isEmpty =
    !commentsLoading &&
    comments &&
    comments.pages.every((page) => page.data.length === 0);

  const fetchCommentCount =
    comments?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  return (
    <Box mt={10}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Comments ({fetchCommentCount})
      </Text>

      <CommentForm blogId={blogId} />

      <CommentList
        comments={comments}
        commentsLoading={commentsLoading}
        commentsError={commentsError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        fetchCommentCount={fetchCommentCount}
        isEmpty={isEmpty}
      />
    </Box>
  );
};

export default CommentSection;
