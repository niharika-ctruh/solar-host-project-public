import { UserOctagon, Location } from 'iconsax-reactjs';
import { TVisitData } from '@/lib/types';
import { VISIT_STATUS_CONFIG } from '@/data';
import { useMemo } from 'react';
import Link from 'next/link';

const VisitCard = ({ data }: { data: TVisitData }) => {
  const statusConfig = useMemo(
    () =>
      VISIT_STATUS_CONFIG[data.status] ??
      VISIT_STATUS_CONFIG['visit_scheduled'],
    [data.status],
  );
  // const [time, period] = new Date(data.date)
  //   .toLocaleTimeString('en-US', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true,
  //   })
  //   .split(' ');
  const isToday = new Date(data.date).getDate() === new Date().getDate();

  return (
    <Link
      href={`/visits/${data._id}`}
      className="font-dm-sans flex overflow-hidden rounded-xl border border-blue-200"
    >
      <div
        className={`flex w-1/5 flex-col items-center p-3 font-semibold uppercase ${isToday ? 'text-primary-400' : 'text-neutral-500'} ${statusConfig.leftBg} ${statusConfig.className ?? ''}`}
      >
        <p className="text-[9px]">
          {new Date(data.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          })}
        </p>
        <p className="text-[15px]">{data.timeSlot}</p>
        {/* <p className="text-xs text-neutral-50">{period}</p> */}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 overflow-hidden px-3 py-2.5">
        <div className="flex items-center justify-between gap-1.5 text-sm font-medium text-gray-800">
          <div className="flex gap-1 overflow-hidden text-sm font-medium">
            <span className="truncate">{data.customer.name}</span>
            {data.status === 'completed' && (
              <span
                className={`inline-flex items-center gap-1 rounded-full text-xs font-semibold! whitespace-nowrap`}
              >
                {data.acceptedHost.visitHostedCount} Visits Hosted
              </span>
            )}
          </div>

          <span
            className={`inline-flex h-min items-start gap-1 rounded-full px-1.5 py-1 text-xs font-semibold! capitalize ${statusConfig.button} ${statusConfig.button}`}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>

        <div className="flex justify-between gap-2 text-sm font-medium text-gray-800">
          <p className="inline-flex items-center gap-1 text-xs text-gray-600">
            <UserOctagon
              size="16"
              className="shrink-0 text-neutral-50"
              variant="Bold"
            />
            <span className="truncate">{data.acceptedHost.name}</span>
          </p>
          <p className="inline-flex items-center gap-1 truncate text-xs text-gray-600">
            <Location
              size="16"
              className="shrink-0 text-neutral-500"
              variant="Outline"
            />
            <span className="w-[15ch] truncate">{data.customer.address}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VisitCard;
