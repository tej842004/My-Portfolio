import type { JSONContent } from "@tiptap/core";

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
  genreId?: string;
  imageUrl?: string;
  imagePublicId?: string;
}
