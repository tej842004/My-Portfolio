import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import type { RefObject } from "react";

interface AlertDialogBoxProps {
  isOpen: boolean;
  cancelRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const AlertDialogBox = ({
  isOpen,
  cancelRef,
  onClose,
  onConfirm,
  isLoading,
}: AlertDialogBoxProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ base: "xs", md: "md" }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to delete?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogBox;
