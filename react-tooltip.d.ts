declare module "react-tooltip" {
  import React from "react";

  export interface TooltipProps {
    anchorId?: string;
    place?: "top" | "right" | "bottom" | "left";
    content?: React.ReactNode;
    events?: ("hover" | "click" | "focus")[];
    positionStrategy?: "absolute" | "fixed";
    wrapper?: "div" | "span";
    children?: React.ReactNode;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    clickable?: boolean;
    onClickOutside?: () => void;
    style?: React.CSSProperties;
    position?: {
      x: number;
      y: number;
    };
    offset?: number;
    delayShow?: number;
    delayHide?: number;
    float?: boolean;
    noArrow?: boolean;
    className?: string;
    classNameArrow?: string;
    openOnClick?: boolean;
    variant?: "dark" | "light" | "success" | "warning" | "error" | "info";
  }

  const Tooltip: React.FC<TooltipProps>;

  export default Tooltip;
}
