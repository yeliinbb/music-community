import axios from "axios";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../constants/errorMessages";

// const environment = process.env.NEXT_PUBLIC_NODE_ENV;

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true // 모든 요청에 쿠키 포함
});

authAxios.interceptors.request.use(
  (config) => {
    console.log("Environment:", process.env.NEXT_PUBLIC_NODE_ENV);
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error || ERROR_MESSAGES.SERVER.BAD_REQUEST;
      switch (error.response.status) {
        case 400:
        case 401:
        case 409:
        case 500:
          toast.error(errorMessage);
          break;
        default:
          // 기본 에러 메시지는 컴포넌트에서 처리하도록 별도 표시 안함
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
