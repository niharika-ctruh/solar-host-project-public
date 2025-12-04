import { Suspense } from 'react';
import Visits from './Visits';

const Page = () => {
  return (
    <Suspense>
      <Visits />
    </Suspense>
  );
};

export default Page;
