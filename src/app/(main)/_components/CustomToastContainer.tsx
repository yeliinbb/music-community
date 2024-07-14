import { ToastContainer, ToastContainerProps } from "react-toastify";

const CustomToastContainer = ({
  closeOnClick = true,
  position = "top-right",
  autoClose = 3000,
  hideProgressBar = true,
  limit = 1,
  ...props
}: ToastContainerProps) => {
  return (
    <ToastContainer
      closeOnClick={closeOnClick}
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      limit={limit}
      {...props}
    />
  );
};

export default CustomToastContainer;
