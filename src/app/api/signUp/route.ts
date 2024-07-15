import { FormState } from "@/types/auth.type";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password, nickname } = (await request.json()) as FormState;

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname
      }
    }
  });
  if (error) {
    console.error("error message:", error.message);
  }

  return Response.json({ errorMsg: error?.message || null });
}
