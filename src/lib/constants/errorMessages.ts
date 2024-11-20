export const ERROR_MESSAGES = {
  VALIDATION: {
    EMAIL: {
      EMPTY: "이메일을 입력해주세요.",
      INVALID_FORMAT: "올바른 이메일 형식이 아닙니다."
    },
    PASSWORD: {
      EMPTY: "비밀번호를 입력해주세요.",
      TOO_SHORT: "비밀번호는 최소 8자 이상이어야 합니다."
    },
    NICKNAME: {
      INVALID_LENGTH: "닉네임은 2-20자 사이어야 합니다."
    },
    FORM: {
      EMPTY_FIELDS: "모든 필드를 입력해주세요."
    }
  },
  AUTH: {
    INVALID_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
    EXISTING_EMAIL: "이미 존재하는 이메일입니다.",
    LOGIN_ERROR: "로그인 중 오류가 발생했습니다.",
    SIGNUP_ERROR: "회원가입 중 오류가 발생했습니다."
  },
  SERVER: {
    BAD_REQUEST: "잘못된 요청입니다. 입력 정보를 확인해주세요.",
    INTERNAL_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    UNKNOWN: "알 수 없는 오류가 발생했습니다.",
    UNEXPECTED: "예기치 못한 오류가 발생했습니다."
  }
} as const;
