import { PropsWithChildren } from "react";

const Button = ({ children }: PropsWithChildren) => {
  return (
    // <Link>
    <button className="shadow-lg w-[150px] bg-white text-black hover:bg-[#989898] active:bg-[#989898] py-[13px] px-[5px] rounded-xl border-solid border-black border-[1.5px]">
      {children}
    </button>
    // </Link>
  );
};

export default Button;
