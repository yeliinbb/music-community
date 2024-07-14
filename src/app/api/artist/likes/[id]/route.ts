import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  console.log("이게 바로 유저아이디지=>", user?.id);

  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .match({ artistId: id, userId: user?.id })
    .single();

  return NextResponse.json(likeData);
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

  return NextResponse.json(deleteData);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();
  const { artistId, userId } = await request.json();

  const { data: postData, error: postError } = await supabase.from("likes").insert({ artistId, userId });

  return NextResponse.json(postData);
}
