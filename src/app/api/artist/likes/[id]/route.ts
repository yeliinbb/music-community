import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();

  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .match({ artistId: id, userId: "69a8c208-3941-43c2-acc6-8562129a2fc6" })
    .single();

  console.log(likeData);

  return NextResponse.json(likeData);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();

  const { data: deleteData, error: deleteError } = await supabase
    .from("likes")
    .delete()
    .match({ artistId: id, userId: "69a8c208-3941-43c2-acc6-8562129a2fc6" });

  return NextResponse.json(deleteData);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();
  const { artistId, userId } = await request.json();

  const { data: postData, error: postError } = await supabase.from("likes").insert({ artistId, userId });

  return NextResponse.json(postData);
}
