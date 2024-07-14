import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg p-8 rounded-lg">{children}</div>
    </div>
  );
};

export default AuthLayout;
