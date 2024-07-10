"use client";

import { useLoginStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { isLogin, login, logout } = useLoginStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });

      // 로그아웃 성공 시 클라이언트 상태 업데이트
      logout();

      // 로그인 페이지로 리다이렉트
      router.replace("/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      // 오류 처리 (예: 알림 표시 등)
    }
  };

  const handleLogin = () => {
    // 로그인 페이지로 이동하거나 로그인 상태를 변경하는 로직을 추가할 수 있습니다.
    login();
    router.replace("/login"); // 예시로 로그인 시 로그인 페이지로 이동
  };

  return <button onClick={isLogin ? handleLogout : handleLogin}>{isLogin ? "로그아웃" : "로그인"}</button>;
}
