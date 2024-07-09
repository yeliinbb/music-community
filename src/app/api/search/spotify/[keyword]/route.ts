import { getAccessToken } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { keyword: string };
}

export async function GET(_: NextRequest, context: Context) {
  const { keyword } = context.params;
  const token = await getAccessToken();

  if (!token || !keyword) {
    return NextResponse.json({ error: "Bad Request..." }, { status: 400 });
  }

  const response = await fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=album%2Cartist&market=KR`, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();

  return NextResponse.json(data);
}
