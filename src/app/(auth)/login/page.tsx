"use client";

import { useLoginStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLoginStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!data.errorMsg) {
      alert("로그인 성공!");
      login();
      router.replace("/");
    } else {
      alert(`로그인 에러: ${data.errorMsg}`);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="mt-4 text-2xl font-bold text-gray-200">Welcome back!</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
            PassWord
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="ml-20 px-10 py-3 border border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-gray-800 transition-colors"
          >
            Login
          </button>
          <Link href="/signup">
            <button
              type="button"
              className="mr-20 px-10 py-3 border border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-gray-800 transition-colors"
            >
              SignUp
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
