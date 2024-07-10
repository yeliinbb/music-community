import { getArtistIds } from "@/lib/getArtistIds";
import { getAccessToken } from "@/lib/spotify";
import { SpotifyArtist } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// const ARTIST_IDS = [];

// export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
//   try {
//     const accessToken = await getAccessToken();
//     const response = await axios.get<SpotifyArtist>(`https://api.spotify.com/v1/artists/${params.id}`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//       params: { market: "KR", locale: "ko_KR" }
//     });

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error("Error fetching track:", error);
//     return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
//   }
// };

const ARTIST_IDS = ['68ym0sOo7MazZxScbm1wtI', '2GEPtT5RDxrmdi0A4mbDi7', '7gSVTyMFvcvwb6JUAJzLb2', '0LigV2SSsRZaeX2htEFXV9'];


export const GET = async () => {
  try {
    const artistIds = await getArtistIds();

    if (!artistIds.length) {
      return NextResponse.json({ error: "No artist IDs found" }, { status: 404 });
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
      console.error("Access token is missing");
      return NextResponse.json({ error: "Access token is missing" }, { status: 500 });
    }

    const artistData = await Promise.all(
      artistIds.map(async (artistId) => {
        try {
          const response = await axios.get<SpotifyArtist>(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { market: "KR", locale: "ko_KR" }
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
