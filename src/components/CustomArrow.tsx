type CustomArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const CustomPrevArrow = ({ onClick, className }: CustomArrowProps) => (
  <div
    className={`custom-arrow custom-prev-arrow ${className}`}
    onClick={onClick}
    style={{ width: "30px", height: "30px" }}
  >
    <img src="chevrons-left.svg" alt="이전 아티스트" />
  </div>
);

export const CustomNextArrow = ({ onClick, className }: CustomArrowProps) => (
  <div
    className={`custom-arrow custom-next-arrow ${className}`}
    onClick={onClick}
    style={{ width: "30px", height: "30px" }}
  >
    <img src="chevrons-right.svg" alt="다음 아티스트" />
  </div>
);
