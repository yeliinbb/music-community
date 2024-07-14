import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  userId: string;
  setUserId: (userId: string) => void;
  clearStorage: () => void;
};

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      isLogin: false,
      userId: "",
      login: () => set({ isLogin: true }),
      logout: () => set({ isLogin: false }),
      setUserId: (userId) => set({ userId }),
      clearStorage: () => {
        localStorage.removeItem("userIdStorage");
      }
    }),
    {
      name: "userIdStorage"
    }
  )
);
