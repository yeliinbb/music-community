import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  try {
    const { id } = params;
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
};
