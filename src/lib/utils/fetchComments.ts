import { CommonCommentType } from "@/types/comment.type";

interface FetchCommentProps {
  postId: string;
  tableName: "comments" | "artistComments" | "posts";
}

export const fetchComments = async ({ postId, tableName }: FetchCommentProps): Promise<CommonCommentType[]> => {
  try {
    const response = await fetch(`/api/${tableName}/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store" // 이 옵션은 필요에 따라 조정할 수 있습니다
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
