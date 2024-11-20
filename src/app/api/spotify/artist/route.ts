import spotifyApiAxios from "@/lib/axios/spotifyApiAxios";
import { getArtistIds } from "@/lib/utils/getArtistIds";
import { SpotifyArtist } from "@/types/spotify.type";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const artistIds = await getArtistIds();

    if (!artistIds.length) {
      return NextResponse.json({ error: "No artist IDs found" }, { status: 404 });
    }

    const artistData = await Promise.all(
      artistIds.map(async (artistId) => {
        try {
          const response = await spotifyApiAxios.get<SpotifyArtist>(`/artists/${artistId}`, {
            params: { market: "KR" }
          });
          return response.data;
        } catch (error) {
          console.error(`Error fetching artist ${artistId}:`, error);
          return null; // 에러 발생 시 null 반환
        }
      })
    );

    return NextResponse.json(artistData.filter((data) => data !== null)); // null 값 제거 후 반환
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
  }
};
