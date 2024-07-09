"use server";
import { Request } from "./../../../../node_modules/node-fetch/@types/index.d";
import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const supabase = createClient();
  try {
    const { title, content } = await request.json();
    const { data, error } = await supabase.from("posts").insert({
      title,
      content
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

export const getPosts = async (id: string) => {
  console.log("id=>", id);
  const supabase = createClient();
  try {
    const { data } = await supabase.from("posts").select("*").eq("id", id);
    console.log("data=>", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
