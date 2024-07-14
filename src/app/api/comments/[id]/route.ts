import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  try {
    const { id } = params;
    const { data, error } = await supabase
      .from("comments")
      .select("*,users(nickname, email)")
      .eq("postId", id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // 데이터가 없을 경우 빈 배열 반환
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
