import { FormState } from "@/types/auth.type";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = (await request.json()) as Omit<FormState, "nickname">;

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("error message:", error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  const user = data.user;

  return Response.json({ user }, { status: 200 });
}
