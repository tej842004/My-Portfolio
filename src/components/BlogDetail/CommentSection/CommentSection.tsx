import { Box, Text } from "@chakra-ui/react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = ({ blogId }: { blogId: string }) => {
  return (
    <Box mt={10}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Comments ({24})
      </Text>

      {/* Input Box */}
      <CommentForm blogId={blogId} />

      {/* Comments List */}
      <CommentList blogId={blogId} />
    </Box>
  );
};

export default CommentSection;
