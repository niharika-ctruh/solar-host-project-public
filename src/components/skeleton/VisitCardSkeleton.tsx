import Skeleton from '../ui/Skeleton';

const VisitCardSkeleton = () => {
  return (
    <div className="flex overflow-hidden rounded-xl border border-blue-200">
      <Skeleton className="h-[76px]! w-1/5! rounded-none! p-3" />
      <div className="flex grow flex-col justify-center gap-2 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="w-1/3!" />
          <Skeleton className="h-6! w-2/5! rounded-full! py-1" />
        </div>
        <div className="flex justify-between gap-2">
          <Skeleton className="w-1/3!" />
          <Skeleton className="w-1/2!" />
        </div>
      </div>
    </div>
  );
};

export default VisitCardSkeleton;
