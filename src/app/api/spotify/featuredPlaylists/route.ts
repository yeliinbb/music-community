import spotifyApiAxios from "@/lib/axios/spotifyApiAxios";
import { SpotifyFeaturedPlaylists } from "@/types/spotify.type";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await spotifyApiAxios.get<SpotifyFeaturedPlaylists>(`/browse/featured-playlists`, {
      params: {
        country: "KR",
        limit: 10
      }
    });

    const featuredPlaylists = response.data.playlists.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      imageUrl: playlist.images[0]?.url,
      tracksCount: playlist.tracks.total,
      trackLink: playlist.external_urls.spotify
    }));

    return NextResponse.json(featuredPlaylists);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch playlists data" }, { status: 500 });
  }
};
