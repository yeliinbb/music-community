import { COMMON_ERROR_MESSAGES } from "@/lib/constants/commonErrorMessages";
import { FormState } from "@/types/auth.type";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = (await request.json()) as Omit<FormState, "nickname">;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Login error:", error.message);

      // 인증 실패 에러 구분하여 처리
      if (error.message === "Invalid login credentials") {
        return NextResponse.json({ error: COMMON_ERROR_MESSAGES.INVALID_CREDENTIALS }, { status: 401 });
      }
      // 그 외의 에러
      return Response.json({ error: COMMON_ERROR_MESSAGES.LOGIN_ERROR }, { status: 400 });
    }

    const user = data.user;
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error during login", error);
    return NextResponse.json({ error: COMMON_ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
