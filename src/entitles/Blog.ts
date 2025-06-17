import type { JSONContent } from "@tiptap/core";
import type { Genre } from "./Genre";

interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id?: string;
  title?: string;
  content?: JSONContent;
  author?: string | Author;
  tags?: string[];
  createdAt?: Date;
  readTime?: number;
  genre?: string | Genre;
  imageUrl?: string;
  imagePublicId?: string;
}
