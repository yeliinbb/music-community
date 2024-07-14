export type FormState = {
  email: string;
  password: string;
  nickname: string;
};

export type LoginState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
};
