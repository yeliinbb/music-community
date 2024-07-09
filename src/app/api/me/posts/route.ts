import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  //TODO userID 하드코딩
  const response = await supabase.from("posts").select("*").eq("userId", "c0badd14-de12-4bdd-9fc8-e8c22516435d");
  console.log("/API/ME/ROUTE___", response);
  const data = response.data;

  return NextResponse.json(data);
}
