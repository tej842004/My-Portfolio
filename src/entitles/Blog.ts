import type { Genre } from "./Genre";

export interface Blog {
  _id?: string;
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
  createdAt?: Date;
  readTime?: number;
  genre?: Genre | string;
  image?: string;
}
