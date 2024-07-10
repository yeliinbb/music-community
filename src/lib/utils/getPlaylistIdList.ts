import { createClient } from "@/utils/supabase/server";

const getPlaylistIdList = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("main_playlist").select("playlistId");
    if (error) {
      throw error;
    }
    const playlistIdList = data.map((playlist) => playlist.playlistId);
    return playlistIdList;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to insert data :", error);
      throw new Error(`Failed to insert data : ${error.message}`);
    }
  }
};

export default getPlaylistIdList;
