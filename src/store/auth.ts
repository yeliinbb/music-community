import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  userId: string;
  userNickname: string;
  setUserId: (userId: string) => void;
  setUserNickname: (userNickname: string) => void;
};

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      isLogin: false,
      userId: "",
      login: () => set({ isLogin: true }),
      logout: () => set({ isLogin: false }),
      setUserId: (userId) => set({ userId }),
      setUserNickname: (userNickname) => set({ userNickname })
    }),
    {
      name: "userIdStorage"
    }
  )
);
