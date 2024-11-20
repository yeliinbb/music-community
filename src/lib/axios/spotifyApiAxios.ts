import axios from "axios";
import { getAccessToken } from "../../app/api/utils/getAccessToken";

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

const spotifyApiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
  params: {
    locale: "ko_KR"
  }
});

spotifyApiAxios.interceptors.request.use(
  async (config) => {
    if (!accessToken || (tokenExpirationTime && Date.now() > tokenExpirationTime)) {
      try {
        const token = await getAccessToken();
        accessToken = token;
        tokenExpirationTime = Date.now() + 3600 * 1000; // 토큰 만료 시간 : 1시간
      } catch (error) {
        console.error("Failed to get Spotify access Token", error);
        throw error;
      }
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default spotifyApiAxios;
