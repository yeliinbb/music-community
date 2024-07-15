import { SpotifySearchResults } from "@/types/spotify.type";
import { User } from "@/types/users.type";

class SearchAPI {
  constructor() {}

  async searchSpotify(query: string | null) {
    const response = await fetch(`/api/search/spotify/${query}`);
    const data: SpotifySearchResults = await response.json();

    return data;
  }

  async searchSpotifyArtists(query: string | null, pageParam: number) {
    const response = await fetch(`/api/search/spotify/artists/${query}?page=${pageParam}`, { cache: "no-store" });
    const data = await response.json();
    return data.artists.items;
  }

  async searchSpotifyAlbums(query: string | null, pageParam: number) {
    const response = await fetch(`/api/search/spotify/albums/${query}?page=${pageParam}`, { cache: "no-store" });
    const data = await response.json();
    return data.albums.items;
  }

  async searchUsers(query: string | null) {
    const response = await fetch(`/api/search/user/${query}`, { cache: "no-store" });
    const data: User[] = await response.json();

    return data;
  }
}

export default SearchAPI;
