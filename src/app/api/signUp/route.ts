import { COMMON_ERROR_MESSAGES } from "@/lib/constants/commonErrorMessages";
import { FormState } from "@/types/auth.type";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password, nickname } = (await request.json()) as FormState;

  try {
    // 이메일 중복 체크
    const { data: existingUser } = await supabase.from("users").select("email").eq("email", email).single();

    if (existingUser) {
      return NextResponse.json({ error: COMMON_ERROR_MESSAGES.EXISTING_EMAIL }, { status: 409 });
    }

    // 회원가입 진행
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });

    if (error) {
      console.error("Signup error:", error.message);
      return NextResponse.json({ error: COMMON_ERROR_MESSAGES.SIGNUP_ERROR }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Server error", error);
    return NextResponse.json({ error: COMMON_ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
