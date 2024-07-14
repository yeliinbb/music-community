import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface Post {
  title: string;
  content: string;
  imageURL: string;
}

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  try {
    const { title, content, imageURL } = (await request.json()) as Post;
    const { data, error } = await supabase.from("posts").insert({
      title,
      content,
      imageURL
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
