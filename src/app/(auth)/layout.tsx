import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg ">{children}</div>
    </div>
  );
};

export default AuthLayout;
