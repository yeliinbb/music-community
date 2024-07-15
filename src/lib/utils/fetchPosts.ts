import { CommonPostType } from "@/types/posts.type";
import axios from "axios";

export const fetchPosts = async (id: string) => {
  const { data } = await axios.get<CommonPostType>(`/api/posts/${id}`);
  return data;
};
