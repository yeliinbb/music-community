import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("POST___");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "c292a5b8d5eb41e0a0b5bb2a704b6c97",
      client_secret: "99af6a083334406a912f32dda910e1ac"
    })
  });
  const data = await response.json();

  console.log("DATA___", data);

  return NextResponse.json(data);
}
