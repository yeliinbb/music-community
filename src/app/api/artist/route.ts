import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export const GET = async (request: Request) => {
  const supabase = createClient();
  try {
    // const { id } = params;
    const { data, error } = await supabase.from("main_artist").select("*");
    //console.log("data=>", data);

    if (error) {
      console.error(error);
      return null;
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
};