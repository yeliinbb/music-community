import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  className?: string;
}

const Tag = ({ children, onClick, type, className }: ButtonProps) => {

  return <button>{children}</button>;
};

export default Tag;
