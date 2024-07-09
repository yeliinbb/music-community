import { SpotifySearchResults } from "@/types/spotify.type";

class API {
  constructor() {}

  async getSearchResult(query: string) {
    const response = await fetch(`http://localhost:3000/api/search/${query}`);
    const data: SpotifySearchResults = await response.json();

    return data;
  }
}

const api = new API();

export default api;
