import { CommonCommentType } from "@/types/comment.type";
import axios from "axios";

export const fetchArtistComments = async (postId: string): Promise<CommonCommentType[]> => {
  try {
    const { data } = await axios.get<CommonCommentType[]>(`/api/artistComments/${postId}`);
    return data;
  } catch (error) {
    console.error("댓글 불러오기 실패", error);
    return [];
  }
};