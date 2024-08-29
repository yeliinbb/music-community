import { CommonPostType } from "@/types/posts.type";

export const fetchPosts = async (id: string): Promise<CommonPostType> => {
  try {
    const response = await fetch(`https://music-community-pearl.vercel.app/api/posts/${id}`, {
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
    return data as CommonPostType;
  } catch (error) {
    console.error("게시물 불러오기 실패", error);
    throw error;
  }
};
