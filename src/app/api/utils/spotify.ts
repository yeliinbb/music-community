import axios from "axios";

// 서버 사이드에서만 사용할 수 있도록 api 폴더 안에 lib 폴더로 이동
export const getAccessToken = async (): Promise<string> => {
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
