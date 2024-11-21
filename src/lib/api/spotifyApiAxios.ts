import axios from "axios";
import { getAccessToken } from "../../app/api/utils/getAccessToken";

const spotifyApiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
  params: {
    locale: "ko_KR"
  }
});

spotifyApiAxios.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default spotifyApiAxios;
