"use client";

import { useLoginStore } from "@/store/auth";
import { FormState } from "@/types/auth.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
    nickname: ""
  };

  const { login } = useLoginStore();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [loginFormState, setLoginFormState] = useState<FormState>(initialState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLoginFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      if (!loginFormState.email || !loginFormState.password) {
        return alert("이메일과 비밀번호 모두 입력해 주세요.");
      }
      const { nickname, ...loginState } = loginFormState;

      try {
        // 로그인 요청
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginState)
        });

        if (!response.ok) {
          throw new Error("서버 오류가 발생했습니다.");
        }

        const data = await response.json();
        if (data.errorMsg) {
          throw new Error(data.errorMsg);
        }

        alert("로그인 성공");
        login();
        setLoginFormState(initialState);
        setIsLoginMode(false);
        router.replace("/");
      } catch (error: any) {
        alert(`로그인 실패: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-gray-800 p-8 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <h2 className="mt-4 text-2xl font-bold text-gray-200">Welcome back!</h2>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginFormState.email}
                onChange={handleInputChange}
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
                value={loginFormState.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <button
                  type="submit"
                  className="ml-20 px-10 py-3 border border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-gray-800 transition-colors "
                >
                  Login
                </button>
              </div>
              <Link href="/signup">
                <div>
                  <button
                    type="submit"
                    className="mr-20 px-10 py-3 border border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-gray-800 transition-colors "
                  >
                    SignUp
                  </button>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
