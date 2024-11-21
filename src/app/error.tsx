"use client";
import { FallbackProps } from "react-error-boundary";

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <span className="text-center text-lg">에러가 발생했습니다. 페이지를 새로고침해주세요.</span>
      <p>에러 메시지: {error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
};

export default ErrorPage;
