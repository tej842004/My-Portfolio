import React, { useRef, useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Box,
  useOutsideClick,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SearchInput: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => setIsExpanded(false),
  });

  useEffect(() => {
    if (isExpanded) inputRef.current?.focus();
  }, [isExpanded]);

  return (
    <Box ref={containerRef} position="relative">
      <Flex align="center">
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={() => setIsExpanded(true)}
          variant="ghost"
          borderRadius="full"
        />
        <MotionBox
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isExpanded ? 200 : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          overflow="hidden"
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              ref={inputRef}
              placeholder="Search..."
              size="md"
              onKeyDown={(e) => e.key === "Escape" && setIsExpanded(false)}
            />
          </InputGroup>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default SearchInput;
