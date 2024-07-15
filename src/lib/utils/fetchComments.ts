import { CommonCommentType } from "@/types/comment.type";
import axios from "axios";

interface FetchCommentProps {
  postId: string;
  tableName: "comments" | "artistComments" | "posts";
}

export const fetchComments = async ({ postId, tableName }: FetchCommentProps): Promise<CommonCommentType[]> => {
  try {
    const { data } = await axios.get<CommonCommentType[]>(`/api/${tableName}/${postId}`);
    return data;
  } catch (error) {
    console.error("댓글 불러오기 실패", error);
    return [];
  }
};
