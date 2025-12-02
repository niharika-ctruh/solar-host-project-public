import Skeleton from '../ui/Skeleton';

const RequestCardSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-3">
      <Skeleton className="h-18 w-14!" />
      <div className="flex w-full grow flex-col gap-1.5 py-5">
        <div className="flex h-6 items-center justify-between">
          <Skeleton className="w-1/3!" />
          <Skeleton className="w-1/3!" />
        </div>
        <div className="flex h-5 items-center justify-between">
          <Skeleton className="w-1/3!" />
          <Skeleton className="w-1/4!" />
        </div>
        <Skeleton className="h-4! w-1/2!" />
      </div>
    </div>
  );
};

export default RequestCardSkeleton;
