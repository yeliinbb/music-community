import { CommonCommentType } from "@/types/comment.type";
import axios from "axios";

export const fetchComments = async (postId: string): Promise<CommonCommentType[]> => {
  try {
    const { data } = await axios.get<CommonCommentType[]>(`/api/comments/${postId}`);
    return data;
  } catch (error) {
    console.error("댓글 불러오기 실패", error);
    return [];
  }
};

// export const fetchComments = async ({ postId, tableName }: fetchCommentsProps): Promise<CommonCommentType[]> => {
//   const supabase = createClient();
//   try {
//     const { data, error } = await supabase
//       .from(tableName)
//       .select("*,users(nickname, email)")
//       .eq("postId", postId)
//       .order("createdAt", { ascending: false });

//     if (error) {
//       console.error("댓글 불러오기 실패", error);
//       throw new Error(error.message);
//     }
//     // 데이터가 없을 경우 빈 배열 반환
//     if (!data) {
//       return [];
//     }
//     return data as CommonCommentType[];
//   } catch (error) {
//     console.log(error);
//     // 오류 발생 시 빈 배열 반환
//     return [];
//   }
// };
