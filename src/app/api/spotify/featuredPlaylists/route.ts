import { getAccessToken } from "@/lib/spotify";
import { SpotifyFeaturedPlaylists } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get<SpotifyFeaturedPlaylists>(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        country: "KR",
        // limit: 10,
        locale: "ko_KR"
      }
    });
    console.log("=============================");
    const featuredPlaylists = response.data.playlists.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      imageUrl: playlist.images[0]?.url,
      tracksCount: playlist.tracks.total,
      trackLink: playlist.external_urls.spotify
    }));

    console.log("response.data.playlists.items", response.data.playlists.items);
    return NextResponse.json(featuredPlaylists);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch playlists data" }, { status: 500 });
  }
};
