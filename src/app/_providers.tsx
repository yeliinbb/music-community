"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CustomToastContainer from "./(main)/_components/CustomToastContainer";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity
          }
        }
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <CustomToastContainer />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
