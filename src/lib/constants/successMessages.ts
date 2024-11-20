export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: "로그인 되었습니다.",
    SIGNUP: "회원가입이 성공적으로 완료되었습니다."
  },
  USER: {
    PROFILE_UPDATE: "프로필이 성공적으로 업데이트되었습니다.",
    PASSWORD_CHANGE: "비밀번호가 성공적으로 변경되었습니다."
  },
  POST: {
    CREATE: "게시글이 성공적으로 작성되었습니다.",
    UPDATE: "게시글이 성공적으로 수정되었습니다.",
    DELETE: "게시글이 성공적으로 삭제되었습니다."
  },
  COMMENT: {
    CREATE: "댓글이 성공적으로 작성되었습니다.",
    UPDATE: "댓글이 성공적으로 수정되었습니다.",
    DELETE: "댓글이 성공적으로 삭제되었습니다."
  }
} as const;
