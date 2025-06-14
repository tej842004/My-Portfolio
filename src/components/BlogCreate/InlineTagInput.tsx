import {
  Box,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";

interface Props {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export const InlineTagInput = ({ tags, setTags }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_LENGTH = 255;

  const totalLength =
    tags.reduce((sum, t) => sum + t.length, 0) + inputValue.length;

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    const newTotalLength =
      tags.reduce((sum, t) => sum + t.length, 0) + trimmed.length;

    if (trimmed && !tags.includes(trimmed) && newTotalLength <= MAX_LENGTH) {
      setTags([...tags, trimmed]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.trim();
      const newTotalLength =
        tags.reduce((sum, t) => sum + t.length, 0) + newTag.length;

      if (newTotalLength <= MAX_LENGTH) {
        addTag(newTag);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "" && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newTotalLength =
      tags.reduce((sum, t) => sum + t.length, 0) + newValue.length;

    if (newTotalLength <= MAX_LENGTH) {
      setInputValue(newValue);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.400"
      borderRadius="md"
      padding={8}
      paddingTop={4}
      paddingBottom={4}
      width="100%"
      minHeight="50px"
      cursor="text"
      onClick={focusInput}
      position="relative"
    >
      <Flex wrap="wrap" align="center" gap="10px">
        {tags.map((tag) => (
          <Tag size="md" key={tag} variant="solid" colorScheme="blue">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(tag)} />
          </Tag>
        ))}

        <Input
          ref={inputRef}
          variant="unstyled"
          flex="1"
          minW="60px"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder={tags.length === 0 ? "Write tags" : ""}
        />
      </Flex>

      <Text
        position="absolute"
        bottom="2px"
        right="8px"
        fontSize="xs"
        color={totalLength >= MAX_LENGTH ? "red.500" : "gray.500"}
      >
        {totalLength} / {MAX_LENGTH}
      </Text>
    </Box>
  );
};
