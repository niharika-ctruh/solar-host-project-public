import { Calendar, Clock } from 'iconsax-reactjs';
import Skeleton from '../ui/Skeleton';

const RequestDetailCardSkeleton = () => {
  return (
    <div className="border-primary-200 font-dm-sans flex flex-col gap-2.5 rounded-2xl border p-5">
      <div className="grid grid-cols-2 items-center gap-8">
        <div className="flex flex-col gap-2.5">
          <div className="text-xs leading-[16.8px] font-medium -tracking-[0.48px] text-neutral-500">
            Customer Details
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="my-0.5 w-1/2!" />
            <Skeleton className="w-1/3!" />
          </div>
        </div>
        <Skeleton className="w-1/2! self-start justify-self-end" />
      </div>
      <div className="relative grid grid-cols-2 rounded-lg py-2.5">
        <div className="bg-neutral-dark-500 absolute top-1/2 left-1/2 h-[26px] w-px -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-neutral-100">
            <Calendar className="h-4 w-4 shrink-0" />
            <div className="text-xs leading-[16.8px] font-medium tracking-[1.2px] uppercase">
              Date
            </div>
          </div>
          <Skeleton className="w-1/2!" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-neutral-100">
            <Clock className="h-4 w-4 shrink-0" />
            <div className="text-xs leading-[16.8px] font-medium tracking-[1.2px] uppercase">
              Time
            </div>
          </div>
          <Skeleton className="w-1/2!" />
        </div>
      </div>
    </div>
  );
};

export default RequestDetailCardSkeleton;
