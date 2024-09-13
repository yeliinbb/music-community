import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .match({ artistId: id, userId: user?.id })
    .maybeSingle();

  if (likeError) {
    return NextResponse.json({ error: likeError }, { status: 400 });
  }

  return NextResponse.json({ isLiked: !!likeData });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: deleteData, error: deleteError } = await supabase
    .from("likes")
    .delete()
    .match({ artistId: id, userId: user?.id });

  if (deleteError) {
    return NextResponse.json({ error: deleteError }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Like removed successfully", data: deleteData });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();
  const { userId } = await request.json();

  const { data: postData, error: postError } = await supabase.from("likes").insert({ artistId: id, userId }).select();

  if (postError) {
    return NextResponse.json({ error: postError }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Like added successfully", data: postData });
}
