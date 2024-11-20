import { getAccessToken } from "@/app/api/utils/getAccessToken";
import spotifyApiAxios from "@/lib/axios/spotifyApiAxios";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { keyword: string };
}

const OFFSET = 10;

export async function GET(req: NextRequest, context: Context) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const page = params.get("page");
  const offset = Number(page) * OFFSET;

  const { keyword } = context.params;

  if (!keyword || !keyword.length) {
    return NextResponse.json({ error: "Bad Request..." }, { status: 400 });
  }

  try {
    const response = await spotifyApiAxios.get(`/search?q=${keyword}&type=album&market=KR&limit=10&offset=${offset}`, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API ERROR___", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
