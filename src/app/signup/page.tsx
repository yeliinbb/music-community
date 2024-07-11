"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !nickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const response = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, nickname })
    });

    const data = await response.json();

    if (!data.errorMsg) {
      alert("회원가입이 성공적으로 완료되었습니다!");
      router.replace("/login");
    } else {
      alert(`회원가입 에러: ${data.errorMsg}`);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-gray-800 p-8 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <h2 className="mt-4 text-2xl font-bold text-gray-200">Welcome!</h2>
          </div>
          <form onSubmit={handleSignup}>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="nickname">
                UserName
              </label>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-20 py-3 border border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-gray-800 transition-colors"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
