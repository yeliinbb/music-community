import { create } from "zustand";

type LoginState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
};

export const useLoginStore = create<LoginState>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false })
}));
