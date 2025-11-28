import Button from '@/components/ui/Button';
import Link from 'next/link';

const Requests = () => {
  return (
    <Link href="/requests/requestId" className="mt-10 block h-min px-10">
      <Button content="Go to request detail page" />
    </Link>
  );
};

export default Requests;
