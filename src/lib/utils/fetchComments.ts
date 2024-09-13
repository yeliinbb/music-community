import { CommonCommentType } from "@/types/comment.type";
import { getApiUrl } from "./config";

interface FetchCommentProps {
  postId: string;
  tableName: "comments" | "artistComments" | "posts";
}

export const fetchComments = async ({ postId, tableName }: FetchCommentProps): Promise<CommonCommentType[]> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/${tableName}/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as CommonCommentType[];
  } catch (error) {
    console.error("댓글 불러오기 실패", error);
    return [];
  }
};
