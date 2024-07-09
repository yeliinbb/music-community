import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_ID as string,
      client_secret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET as string
    })
  });
  const data = await response.json();

  console.log("DATA___", data);

  return NextResponse.json(data);
}
