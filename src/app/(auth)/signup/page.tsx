import { Suspense } from 'react';
import SignUp from './_components/SignUp';
import LoadingPage from '@/app/loading';

const SignUpPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SignUp />
    </Suspense>
  );
};

export default SignUpPage;
