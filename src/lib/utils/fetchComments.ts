import { CommonCommentType } from "@/types/comment.type";
import { TableName } from "../constants/tableNames";
import { createClient } from "@/utils/supabase/client";

interface FetchCommentProps {
  postId: string;
  tableName: TableName;
}

export const fetchComments = async ({ postId, tableName }: FetchCommentProps): Promise<CommonCommentType[]> => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*,users(nickname, email)")
      .eq("postId", postId)
      .order("createdAt", { ascending: false });

    if (!data || error) return [];

    return data as CommonCommentType[];
  } catch (error) {
    console.error("댓글 불러오기 실패", error);
    return [];
  }
};
