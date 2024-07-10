import { Request } from "./../../../../node_modules/node-fetch/@types/index.d";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface Post {
  title: string;
  content: string;
}

export const POST = async (request: Request) => {
  const supabase = createClient();
  try {
    const { title, content } = (await request.json()) as Post;
    const { data, error } = await supabase.from("posts").insert({
      title,
      content
    });
    if (error) {
      return NextResponse.json({ error: "등록실패", message: error }, { status: 500 });
    }
    return NextResponse.json({ message: "등록성공" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error", message: error }, { status: 500 });
  }
};
