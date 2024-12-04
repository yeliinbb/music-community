import { Suspense } from 'react';
import Login from './_components/Login';
import LoadingPage from '@/app/loading';

const LoginPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
