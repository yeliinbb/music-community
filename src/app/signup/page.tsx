"use client";

import { FormState } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
    nickname: ""
  };

  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formState.nickname || !formState.email || !formState.password) {
      return alert("닉네임, 이메일, 비밀번호 모두 입력해 주세요.");
    }

    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error("회원가입 요청이 실패하였습니다.");
      }

      const data = await response.json();

      if (data.errorMsg) {
        throw new Error(data.errorMsg);
      }

      alert("회원가입 성공");
      setFormState(initialState);
      router.replace("/login");
    } catch (error: any) {
      alert(`오류가 발생했습니다: ${error.message}`);
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-gray-800 p-8 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <h2 className="mt-4 text-2xl font-bold text-gray-200">Welcome!</h2>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                UserName
              </label>
              <input
                type="text"
                name="nickname"
                value={formState.nickname}
                className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                PassWord
              </label>
              <input
                type="password"
                name="password"
                value={formState.password}
                className="w-full px-3 py-2 bg-gray-800 border-b-2 border-blue-400 text-gray-200 focus:outline-none focus:border-blue-400"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="mx-auto block">
                <button
                  type="submit"
                  className="px-20 py-3 border border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-gray-800 transition-colors "
                >
                  SignUp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
