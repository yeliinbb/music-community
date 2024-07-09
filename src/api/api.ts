import { SpotifySearchResults } from "@/types/spotify.type";
import { User } from "@/types/users.type";
import MeAPI from "./me.api";

class API {
  me;

  constructor() {
    this.me = new MeAPI();
  }

  async getSearchSpotify(query: string) {
    const response = await fetch(`http://localhost:3000/api/search/spotify/${query}`);
    // console.log("GET SEARCH SPOTIFY___", response);
    const data: SpotifySearchResults = await response.json();

    return data;
  }

  async getSearchUsers(query: string) {
    const response = await fetch(`http://localhost:3000/api/search/user/${query}`);
    // console.log("GET SEARCH USERS___", response);
    const data: User[] = await response.json();

    return data;
  }
}

const api = new API();

export default api;
