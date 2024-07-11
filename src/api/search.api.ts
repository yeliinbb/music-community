import { SpotifySearchResults } from "@/types/spotify.type";
import { User } from "@/types/users.type";

class SearchAPI {
  constructor() {}

  async searchSpotify(query: string | null) {
    const response = await fetch(`http://localhost:3000/api/search/spotify/${query}`);
    // console.log("GET SEARCH SPOTIFY___", response);
    const data: SpotifySearchResults = await response.json();

    return data;
  }

  async searchSpotifyArtists(query: string | null, pageParam: number) {
    const response = await fetch(`http://localhost:3000/api/search/spotify/artists/${query}?page=${pageParam}`);
    // console.log("GET SPOTIFY ARTISTS INFINITY___", response);
    const data = await response.json();
    // console.log("GET SPOTIFY ARTISTS INFINITY DATA___", data);
    return data.artists.items;
  }

  async searchSpotifyAlbums(query: string | null, pageParam: number) {
    const response = await fetch(`http://localhost:3000/api/search/spotify/albums/${query}?page=${pageParam}`);
    // console.log("GET SPOTIFY ALBUMS INFINITY___", response);
    const data = await response.json();
    // console.log("GET SPOTIFY ALBUMS INFINITY DATA___", data);
    return data.albums.items;
  }

  async searchUsers(query: string | null) {
    const response = await fetch(`http://localhost:3000/api/search/user/${query}`);
    // console.log("GET SEARCH USERS___", response);
    const data: User[] = await response.json();

    return data;
  }
}

export default SearchAPI;
