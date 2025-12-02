'use client';
import { REQUEST_STATUS_CONFIG } from '@/data';
import useCountdown from '@/hooks/useCountdown';
import { TRequestDetailData } from '@/lib/types';
import { formatDate, to12Hour } from '@/lib/utils';
import { Calendar, Clock } from 'iconsax-reactjs';
import { useMemo } from 'react';

const RequestDetailCard = ({ data }: { data: TRequestDetailData }) => {
  const timeLeft = useCountdown({
    date: data.date,
    time: data.time,
    status: data.status,
  });
  const statusConfig = useMemo(
    () => REQUEST_STATUS_CONFIG[data.status],
    [data.status],
  );

  return (
    <div className="border-primary-200 font-dm-sans flex flex-col gap-3 rounded-2xl border p-5">
      <div className="grid grid-cols-2 items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xs leading-[16.8px] font-medium -tracking-[0.48px] text-neutral-500">
            Customer Details
          </div>
          <div className="flex flex-col gap-1">
            <div className="line-clamp-1 text-base leading-[22.4px] font-semibold -tracking-[0.64px] text-ellipsis text-neutral-500">
              {data.name}
            </div>
            <div className="line-clamp-1 text-xs leading-[16.8px] -tracking-[0.48px] text-ellipsis text-neutral-50">
              {data.id}
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col items-end justify-between">
          <div
            className={`flex h-fit w-fit items-center gap-0.5 justify-self-end rounded-3xl ${statusConfig.bg} py-1 pr-2 pl-1.5`}
          >
            {statusConfig.icon}
            <div
              className={`${statusConfig.text} text-xs leading-3 font-semibold -tracking-[0.48px]`}
            >
              {statusConfig.label}
            </div>
          </div>
          {data.status === 'pending' && (
            <div className="flex flex-col items-end text-neutral-500">
              <div className="text-xs leading-[16.8px] font-medium -tracking-[0.48px]">
                Request expires in
              </div>
              <div className="text-base leading-[22.4px] font-semibold -tracking-[0.64px]">
                {timeLeft}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`relative grid grid-cols-2 rounded-lg ${statusConfig.bg} py-2`}
      >
        <div className="bg-neutral-dark-500 absolute top-1/2 left-1/2 h-[26px] w-px -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-0.5 text-neutral-100">
            <Calendar className="h-4 w-4 shrink-0" />
            <div className="text-xs leading-[16.8px] font-medium tracking-[1.2px] uppercase">
              Date
            </div>
          </div>
          <div className="text-sm leading-[19.6px] font-semibold -tracking-[0.56px] text-neutral-500">
            {formatDate(data.date)}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-0.5 text-neutral-100">
            <Clock className="h-4 w-4 shrink-0" />
            <div className="text-xs leading-[16.8px] font-medium tracking-[1.2px] uppercase">
              Time
            </div>
          </div>
          <div className="text-sm leading-[19.6px] font-semibold -tracking-[0.56px] text-neutral-500">
            {to12Hour(data.time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailCard;
