import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { keyword: string };
}

export async function GET(_: NextRequest, context: Context) {
  const { keyword } = context.params;

  if (!keyword) {
    return NextResponse.json({ error: "Bad Request..." }, { status: 400 });
  }

  const supabase = createClient();
  const response = await supabase.from("users").select("*").ilike("nickname", `%${keyword}%`);
  const data = response.data;

  return NextResponse.json(data);
}
