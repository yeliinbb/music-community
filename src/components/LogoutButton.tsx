"use client";

import { useLoginStore } from "@/store/auth";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
  const { isLogin, login, logout } = useLoginStore();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("세션 가져오기 중 오류 발생:", error);
      } else if (data.session) {
        login(); // 세션이 있으면 로그인 상태로 설정
      }
    };
    fetchUserSession();
  }, [supabase, login]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });

      // 로그아웃 성공 시 클라이언트 상태 업데이트
      logout();

      // 로그인 페이지로 리다이렉트
      router.replace("/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  const handleLogin = () => {
    router.replace("/login"); // 로그인 페이지로 이동
  };

  return <button onClick={isLogin ? handleLogout : handleLogin} className="font-bold">{isLogin ? "로그아웃" : "로그인"}</button>;
}
