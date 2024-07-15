"use client";

import { useLoginStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setUserId } = useLoginStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("이메일과 비밀번호를 입력해주세요.");
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
      toast.success("로그인 성공!");
      login();
      setUserId(data.user.id);
      router.replace("/");
    } else {
      toast.warn(`로그인 에러: ${data.errorMsg}`);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-[#d9d9d9] p-8 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <h2 className="mt-4 text-2xl font-bold text-black-200">Welcome back!</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-black-400 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#d9d9d9] border-b-2 border-black focus:outline-none focus:border-[#54b2d3]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-black-400 text-sm font-bold mb-2" htmlFor="password">
                PassWord
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#d9d9d9] border-b-2 border-black focus:outline-none focus:border-[#54b2d3]"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="ml-25 px-10 py-3 border border-black bg-[white] text-black-400 font-bold hover:bg-[#54b2d3] "
              >
                Login
              </button>
              <Link href="/signup">
                <button
                  type="button"
                  className="mr-25 px-10 py-3 border border-black bg-[white] text-black-400 font-bold hover:bg-[#54b2d3] "
                >
                  SignUp
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
