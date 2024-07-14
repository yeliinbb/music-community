import { createClient } from "@/utils/supabase/client";

const getPlaylistIdList = async (): Promise<string[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("main_playlist").select("playlistId");
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error("No playlist ids found");
    }
    // playlistId가 존재하는 항목만 필터링하여 리턴
    const playlistIdList = data
      .filter((playlist) => playlist.playlistId !== null)
      .map((playlist) => playlist.playlistId as string);

    return playlistIdList;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to insert data :", error);
      throw new Error(`Failed to insert data : ${error.message}`);
    }
    // 빈 배열을 반환하여 예외 상황을 처리
    return [];
  }
};

export default getPlaylistIdList;
