import { Flex, IconButton } from "@chakra-ui/react";
import type { Editor } from "@tiptap/core";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";

interface Props {
  bodyEditor: Editor | null;
}

const Toolbar = ({ bodyEditor }: Props) => {
  return (
    <Flex wrap="wrap" gap={2} width="100%">
      <IconButton
        icon={<FaBold />}
        aria-label="Bold"
        onClick={() => bodyEditor?.chain().focus().toggleBold().run()}
        variant={bodyEditor?.isActive("bold") ? "solid" : "ghost"}
      />
      <IconButton
        icon={<FaItalic />}
        aria-label="Italic"
        onClick={() => bodyEditor?.chain().focus().toggleItalic().run()}
        variant={bodyEditor?.isActive("italic") ? "solid" : "ghost"}
      />
      <IconButton
        icon={<FaUnderline />}
        aria-label="Underline"
        onClick={() => bodyEditor?.chain().focus().toggleUnderline().run()}
        variant={bodyEditor?.isActive("underline") ? "solid" : "ghost"}
      />
      <IconButton
        icon={<FaStrikethrough />}
        aria-label="Strikethrough"
        onClick={() => bodyEditor?.chain().focus().toggleStrike().run()}
        variant={bodyEditor?.isActive("strike") ? "solid" : "ghost"}
      />
      <IconButton
        icon={<FaAlignLeft />}
        aria-label="Align Left"
        onClick={() => bodyEditor?.chain().focus().setTextAlign("left").run()}
        variant={
          bodyEditor?.isActive({ textAlign: "left" }) ? "solid" : "ghost"
        }
      />
      <IconButton
        icon={<FaAlignCenter />}
        aria-label="Align Center"
        onClick={() => bodyEditor?.chain().focus().setTextAlign("center").run()}
        variant={
          bodyEditor?.isActive({ textAlign: "center" }) ? "solid" : "ghost"
        }
      />
      <IconButton
        icon={<FaAlignRight />}
        aria-label="Align Right"
        onClick={() => bodyEditor?.chain().focus().setTextAlign("right").run()}
        variant={
          bodyEditor?.isActive({ textAlign: "right" }) ? "solid" : "ghost"
        }
      />
      <IconButton
        icon={<FaListUl />}
        aria-label="Bullet List"
        onClick={() => bodyEditor?.chain().focus().toggleBulletList().run()}
        variant={bodyEditor?.isActive("bulletList") ? "solid" : "ghost"}
      />
      <IconButton
        icon={<FaListOl />}
        aria-label="Ordered List"
        onClick={() => bodyEditor?.chain().focus().toggleOrderedList().run()}
        variant={bodyEditor?.isActive("orderedList") ? "solid" : "ghost"}
      />
    </Flex>
  );
};

export default Toolbar;
