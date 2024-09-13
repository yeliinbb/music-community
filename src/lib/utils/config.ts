export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // 서버 사이드
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }
  // 클라이언트 사이드
  return (window as Window).location.origin;
};
