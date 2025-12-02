import { Suspense } from 'react';
import Requests from './Requests';

const Page = () => {
  return (
    <Suspense fallback={null}>
      <Requests />
    </Suspense>
  );
};

export default Page;
