import { CommonCommentType } from "@/types/comment.type";

interface FetchCommentProps {
  postId: string;
  tableName: "comments" | "artistComments" | "posts";
}

export const fetchComments = async ({ postId, tableName }: FetchCommentProps): Promise<CommonCommentType[]> => {
  try {
    const response = await fetch(`https://music-community-pearl.vercel.app/api/${tableName}/${postId}`, {
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
