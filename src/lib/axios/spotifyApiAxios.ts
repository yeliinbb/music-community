import axios from "axios";

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

const spotifyApiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL
});

spotifyApiAxios.interceptors.response.use(
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

const getAccessToken = async (): Promise<string> => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    throw new Error("Spotify credentials are not set.");
  }

  const response = await axios.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
    headers: {
      Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
    }
  });

  return response.data.access_token;
};

export default spotifyApiAxios;
