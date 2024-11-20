import Image from "next/image";

type CustomArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
  <div className={`custom-arrow custom-prev-arrow absolute top-arrow-top ${className}`} onClick={onClick}>
    <Image src="/chevrons-left.svg" alt="이전 아티스트" width={30} height={30} />
  </div>
);

export const CustomNextArrow = ({ onClick, className }: CustomArrowProps) => (
  <div className={`custom-arrow custom-next-arrow absolute top-arrow-top  ${className}`} onClick={onClick}>
    <Image src="/chevrons-right.svg" alt="다음 아티스트" width={30} height={30} />
  </div>
);
