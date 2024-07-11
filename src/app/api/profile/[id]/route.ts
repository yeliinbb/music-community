import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const userId = params.id;
  console.log("userId test=>", userId);
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, nickname, email, profileUrl")
      .eq("id", userId)
      .single();

    if (error) throw new Error(`사용자 정보 가져오기에 실패했습니다 : ${error.message}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
  }
};

// export const PUT = async (userId, profilePicturFile) => {

// }
