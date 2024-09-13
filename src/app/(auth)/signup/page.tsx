"use client";

import authAxios from "@/lib/axios/authAxios";
import { CLIENT_ERROR_MESSAGES } from "@/lib/constants/clientErrorMessages";
import { COMMON_ERROR_MESSAGES } from "@/lib/constants/commonErrorMessages";
import { SUCCESS_MESSAGES } from "@/lib/constants/successMessages";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const validateInputs = () => {
    if (!email || !password || !nickname) {
      toast.warn(CLIENT_ERROR_MESSAGES.EMPTY_FIELDS);
      return false;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn(CLIENT_ERROR_MESSAGES.INVALID_EMAIL_FORMAT);
      return false;
    }

    if (password.length < 8) {
      toast.warn(CLIENT_ERROR_MESSAGES.PASSWORD_TOO_SHORT);
      return false;
    }

    if (nickname.length < 2 || nickname.length > 20) {
      toast.warn(CLIENT_ERROR_MESSAGES.INVALID_NICKNAME_LENGTH);
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const { data } = await authAxios.post("/api/signUp", { email, password, nickname });
      if (data.success) {
        toast.success(SUCCESS_MESSAGES.SIGNUP);
        router.replace("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && ![400, 401, 409, 500].includes(error.response.status)) {
          console.error("Unhandled error:", error.response?.data?.error);
          toast.error(COMMON_ERROR_MESSAGES.SIGNUP_ERROR);
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error(COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-[#d9d9d9] p-8 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <h2 className="mt-4 text-2xl font-bold text-black-200">Welcome!</h2>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="mb-6">
              <label className="block text-black-400 text-sm font-bold mb-2" htmlFor="nickname">
                UserName
              </label>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 bg-[#d9d9d9] border-b-2 border-black focus:outline-none focus:border-[#54b2d3]"
              />
            </div>
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
              <Link href="/login">
                <button
                  type="button"
                  className="ml-25 px-10 py-3 border border-black bg-[white] text-black-400 font-bold hover:bg-[#54b2d3] "
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="mr-25 px-10 py-3 border border-black bg-[white] text-black-400 font-bold hover:bg-[#54b2d3] "
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

export default SignUpPage;
