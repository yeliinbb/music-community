import { CommonCommentType } from "@/types/comment.type";
import { TableName } from "../constants/tableNames";
import { createClient } from "@/utils/supabase/client";
import { getApiUrl } from "./getApiUrl";

interface FetchCommentProps {
  postId: string;
  tableName: TableName;
}

// export const fetchComments = async ({ postId, tableName }: FetchCommentProps): Promise<CommonCommentType[]> => {
//   const supabase = createClient();
//   try {
//     const { data, error } = await supabase
//       .from(tableName)
//       .select("*,users(nickname, email)")
//       .eq("postId", postId)
//       .order("createdAt", { ascending: false });

//     if (!data || error) {
//       return [];
//     }

//     return data as CommonCommentType[];
//   } catch (error) {
//     console.error("댓글 불러오기 실패", error);
//     return [];
//   }
// };

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
