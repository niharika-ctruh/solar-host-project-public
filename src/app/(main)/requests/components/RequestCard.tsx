import { REQUEST_STATUS_CONFIG } from '@/data';
import useCountdown from '@/hooks/useCountdown';
import { TRequestData } from '@/lib/types';
import { to12Hour } from '@/lib/utils';
import { Clock, Location } from 'iconsax-reactjs';
import Link from 'next/link';
import { useMemo } from 'react';

const RequestCard = ({ data }: { data: TRequestData }) => {
  const timeLeft = useCountdown({
    date: data.date,
    time: data.timeSlot,
    status: data.status,
  });
  const statusConfig = useMemo(
    () =>
      REQUEST_STATUS_CONFIG[data.status] ?? REQUEST_STATUS_CONFIG['cancelled'],
    [data.status],
  );

  return (
    <Link
      href={`/requests/${data._id}`}
      className="font-dm-sans flex w-full gap-3 px-2"
    >
      <div className="border-background-400 my-auto flex h-18 w-14 flex-col items-center justify-center gap-1 rounded-lg border">
        <div className="text-background-dark-500 text-[18px] leading-[18px] font-semibold tracking-[-0.72px]">
          {new Date(data.date).getDate()}
        </div>
        <div className="text-xs leading-3 font-semibold tracking-[-0.48px] text-neutral-50">
          {new Date(data.date).toLocaleString('en-US', {
            month: 'short',
          })}
        </div>
      </div>
      <div className="flex w-full grow flex-col gap-1 py-5">
        <div className="flex justify-between">
          <div className="flex items-center justify-center text-sm leading-[19px] font-semibold tracking-[-0.56px] text-neutral-500">
            {data.customer.name}
          </div>
          <div
            className={`flex items-center justify-center gap-0.5 rounded-3xl py-1 pr-2 pl-1.5 text-[12px] leading-3 font-semibold tracking-[-0.48px] ${statusConfig.bg} ${statusConfig.text}`}
          >
            <span>{statusConfig.icon}</span>
            {statusConfig.label}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center text-xs leading-4 font-normal tracking-[-0.48px] text-neutral-50">
            {data.customer.customerId}
          </div>
          <div className="bg-background-400 flex items-center gap-0.5 rounded-3xl px-2 py-1 text-[10px] leading-2.5 font-semibold tracking-[-0.4px] text-neutral-100">
            <Clock
              size="12"
              className="fill-background-dark-100 text-background-50"
            />
            {to12Hour(data.timeSlot)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-0.5">
            <Location size="16" className="text-neutral-50" />
            <div
              className={`${data.status === 'pending' && 'max-w-[120px] truncate overflow-hidden whitespace-nowrap'} text-xs leading-4 font-normal tracking-[-0.48px] text-neutral-50 not-italic`}
            >
              {data.customer.address}
            </div>
          </div>
          {data.status === 'pending' && (
            <div className="truncate text-xs leading-4 font-normal tracking-[-0.48px] text-red-800">
              {timeLeft === 'Expired' ? 'Expired' : `Expires in ${timeLeft}`}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
