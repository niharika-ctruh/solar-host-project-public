import Button from '@/components/ui/Button';
import { CalendarAdd } from 'iconsax-reactjs';
import Image from 'next/image';
import Link from 'next/link';
import RequestsList from '../components/RequestsList';

const Home = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex min-h-20 items-center justify-between px-4 py-3">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          className="h-full w-[71px]"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Link href="/requests/new">
          <Button
            type="button"
            content="New Request"
            leftIcon={<CalendarAdd className="h-6 w-6" />}
            className="bg-primary-400 rounded-md px-3! py-2! text-base! [&>div]:gap-2"
          />
        </Link>
      </div>

      {/* Content */}
      <RequestsList isTodayVisits className="px-3 pt-12 pb-4" />
    </div>
  );
};

export default Home;
