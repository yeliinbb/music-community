"use client";

import { useLoginStore } from "@/store/auth";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
  const { isLogin, login, logout, clearStorage } = useLoginStore();
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
      clearStorage();
      // 로그인 페이지로 리다이렉트
      router.replace("/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  const handleLogin = () => {
    router.replace("/login"); 
  };

  return (
    <button
      onClick={isLogin ? handleLogout : handleLogin}
      className=" bg-[#989898] text-white min-w-100px px-4 py-2.5 rounded-xl"
    >
      {isLogin ? "로그아웃" : "로그인"}
    </button>
  );
}
