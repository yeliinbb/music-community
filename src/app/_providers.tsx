'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from '../components/CustomToastContainer';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorPage from './error';

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <ErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error('Error caught by boundary:', error);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <CustomToastContainer />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default Providers;
