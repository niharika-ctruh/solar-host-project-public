'use client';
import { VISIT_STATUS_CONFIG } from '@/data';
import { TVisitData } from '@/lib/types';
import { formatFullDateTime, to12Hour } from '@/lib/utils';
import { Clock, Location } from 'iconsax-reactjs';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect } from 'react';

const VisitDetailCard = ({
  data,
  isScheduled,
}: {
  data: TVisitData;
  isScheduled: boolean;
}) => {
  const router = useRouter();
  const statusConfig = useMemo(
    () => VISIT_STATUS_CONFIG[data.status],
    [data.status],
  );

  useEffect(() => {
    if (!statusConfig) {
      router.push(`/requests/${data._id}`);
    }
  }, [statusConfig, router, data._id]);

  if (!statusConfig) {
    return null;
  }

  return (
    <div className="border-primary-200 bg-primary-50 flex w-full flex-col gap-3 self-start rounded-2xl border p-5">
      <div className="flex w-full flex-1 justify-between gap-2">
        <div className="flex w-full flex-col gap-1 text-left text-sm/6 text-neutral-500">
          <span className="text-xs/4.75 font-medium tracking-[-0.48px]">
            Customer Details
          </span>
          <span className="text-base/6 font-semibold tracking-[-0.64px]">
            {data.customer.name}
          </span>
          <span className="text-xs/4.75 font-medium text-neutral-50">
            {data.customer.customerId}
          </span>
        </div>
        <div className="flex w-full flex-col gap-1 text-right text-sm/6 text-neutral-500">
          <span className="text-xs/4.75 font-medium tracking-[-0.48px]">
            Host Details
          </span>
          <span className="text-base/6 font-semibold tracking-[-0.64px]">
            {data.acceptedHost.name}
          </span>
          {(isScheduled ? true : data.acceptedHost.visitHostedCount > 0) && (
            <span className="bg-background-400 w-fit self-end rounded-full px-2 py-1 text-[10px]/4.75 font-semibold text-neutral-100">
              {isScheduled
                ? data.acceptedHost.hostSseId
                : `${data.acceptedHost.visitHostedCount} Visits Hosted`}
            </span>
          )}
        </div>
      </div>

      <hr className="border-background-400 border-t" />
      <div className="flex items-center justify-start gap-3 text-left text-sm/6 text-neutral-500">
        <p
          className={`${statusConfig.detailBg} flex w-11 shrink-0 flex-col items-center justify-center rounded-md p-1 text-white`}
        >
          <span className="text-xl/7 font-semibold">
            {new Date(data.date).toLocaleDateString('default', {
              day: 'numeric',
            })}
          </span>
          <span className="text-xs/4.5 font-normal">
            {new Date(data.date).toLocaleDateString('default', {
              month: 'short',
            })}
          </span>
        </p>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`${statusConfig.detailText} inline-flex items-center gap-0.5 text-base/6 font-semibold`}
            >
              <Clock
                size="16"
                variant="Bold"
                className={`shrink-0 ${statusConfig.detailText}`}
              />
              {to12Hour(data.timeSlot)}
            </span>
            <span
              className={`inline-flex h-min items-start gap-1 rounded-full px-1.5 py-1 text-xs font-semibold! ${statusConfig.button}`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </div>

          <span className="inline-flex items-start gap-0.5 truncate text-xs/4.75 font-medium text-neutral-50">
            <Location
              size="16"
              variant="Bold"
              className="shrink-0 text-neutral-50"
            />
            <span className="line-clamp-3 text-wrap">
              {data.customer.address}
            </span>
          </span>
        </div>
      </div>
      <hr className="border-background-400 border-t" />
      <div className="flex flex-col gap-1.5 text-xs/4 text-neutral-500">
        <div className="flex justify-between gap-1">
          <p>Booked by</p>
          <p className="text-sm/5 font-semibold capitalize">
            {data?.consultant?.firstName} {data?.consultant?.lastName}
          </p>
        </div>
        <div className="flex justify-between gap-1">
          <p>Visit booked on</p>
          <p className="font-normal text-neutral-50">
            {formatFullDateTime(data.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitDetailCard;
