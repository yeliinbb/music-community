import { getAccessToken } from "@/lib/spotify";
import { SpotifyArtist } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface GetProps {
  request: NextRequest;
  params: { id: string };
}

export const GET = async ({ request, params }: GetProps) => {
  try {
    console.log("여기가 파람스 =>", params);
    const token = await getAccessToken();
    console.log("여기가 토큰=>", token);
    const response = await axios.get<SpotifyArtist>(`https://api.spotify.com/v1/artists/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { market: "KR" }
    });
    console.log("여기가 리스폰스 =>", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 });
  }
};
