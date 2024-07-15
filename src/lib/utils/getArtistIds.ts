import { createClient } from "@/utils/supabase/client";

export const getArtistIds = async (): Promise<string[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("main_artist").select("*");

  if (error) {
    console.error("아티스트 id 데이터 불러오기 실패", error);
    throw new Error("Failed to fetch artist IDs");
  }

  const artistIds = data.filter((artist) => artist.artistId !== null).map((artist) => artist.artistId as string);

  return artistIds;
};
