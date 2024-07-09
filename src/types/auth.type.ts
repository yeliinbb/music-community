export type FormState = {
  email: string;
  password: string;
  nickname: string;
};

// 회원 정보
export type User = {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
};

// 인증 상태와 관련된 정보
export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};
