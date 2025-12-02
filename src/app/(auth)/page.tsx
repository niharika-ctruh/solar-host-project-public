import { Suspense } from 'react';
import Login from './Login';

const Page = () => {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
};

export default Page;
