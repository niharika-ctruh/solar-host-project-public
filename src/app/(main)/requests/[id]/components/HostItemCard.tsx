import { THostItemData } from '@/lib/types';
import { Location, TickCircle } from 'iconsax-reactjs';

const HostItemCard = ({ data }: { data: THostItemData }) => {
  return (
    <div className="font-dm-sans flex items-center gap-3 px-5">
      <div className="h-12 w-12 rounded-lg bg-green-500 p-3">
        <TickCircle className="text-green-success-500" />
      </div>
      <div className="flex grow flex-col gap-1 py-4">
        <div className="flex justify-between">
          <div className="flex grow gap-2 text-sm leading-5 font-medium -tracking-[0.56px]">
            <span className="text-neutral-500">{data.name}</span>
            <span className="text-neutral-50">{data.id}</span>
          </div>
          {data.totalVisits > 0 && (
            <div className="text-xs leading-[16.8px] -tracking-[0.48px] text-neutral-500">
              {data.totalVisits} Visits Hosted
            </div>
          )}
        </div>
        <div className="flex gap-0.5">
          <Location size="16" className="shrink-0" />
          <div className="line-clamp-1 text-xs leading-[16.8px] -tracking-[0.48px] text-ellipsis text-neutral-50">
            {data.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostItemCard;
