import { Clock, Location } from 'iconsax-reactjs';
import Skeleton from '../ui/Skeleton';

const VisitDetailCardSkeleton = () => {
  return (
    <div className="border-primary-200 bg-primary-50 flex w-full flex-col gap-3 self-start rounded-2xl border p-5">
      <div className="flex w-full flex-1 justify-between gap-2">
        <div className="flex w-full flex-col gap-1 text-left text-sm/6 text-neutral-500">
          <span className="text-xs/4.75 font-medium tracking-[-0.48px]">
            Customer Details
          </span>
          <Skeleton className="my-1 w-2/3!" />
          <Skeleton className="my-0.5 w-1/2!" />
        </div>
        <div className="flex w-full flex-col items-end gap-1 text-right text-sm/6 text-neutral-500">
          <span className="text-xs/4.75 font-medium tracking-[-0.48px]">
            Host Details
          </span>
          <Skeleton className="my-1 w-1/2!" />
          <Skeleton className="mb-[3px] h-6! w-2/3! rounded-full!" />
        </div>
      </div>
      <hr className="border-background-400 border-t" />
      <div className="flex items-center justify-start gap-3 text-left text-sm/6 text-neutral-500">
        <Skeleton className="h-[54px]! w-11!" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex grow items-center gap-0.5">
              <Clock size="16" variant="Bold" className="shrink-0" />
              <Skeleton className="w-1/4!" />
            </div>
            <Skeleton className="w-1/3! rounded-full!" />
          </div>
          <span className="inline-flex items-center gap-0.5">
            <Location
              size="16"
              variant="Bold"
              className="shrink-0 text-neutral-50"
            />
            <Skeleton className="w-4/5!" />
          </span>
        </div>
      </div>
      <hr className="border-background-400 border-t" />
      <div className="flex flex-col gap-1.5 text-xs/4 text-neutral-500">
        <div className="my-0.5 flex justify-between gap-1">
          <p>Booked by</p>
          <Skeleton className="w-1/4!" />
        </div>
        <div className="flex justify-between gap-1">
          <p>Visit booked on</p>
          <Skeleton className="w-1/3!" />
        </div>
      </div>
    </div>
  );
};

export default VisitDetailCardSkeleton;
