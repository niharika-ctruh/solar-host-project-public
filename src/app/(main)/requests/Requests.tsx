'use client';
import DatePickerRow from './components/DatePickerRow';
import { Fragment } from 'react';
import { ArrowLeft2, CalendarAdd, SearchNormal1 } from 'iconsax-reactjs';
import useQueryParams from '@/hooks/useQueryParams';
import Input from '@/components/ui/Input';
import { useGetRequests } from '@/services/requests-service';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import RequestsList from '../components/RequestsList';

const Requests = () => {
  const { queryParams, updateParams } = useQueryParams();
  const getRequestsQuery = useGetRequests();

  const allCounts = getRequestsQuery.data?.pages?.[0]?.counts;

  const TABS_DATA = [
    {
      label: 'All',
      key: 'all',
      value: allCounts?.all || 0,
    },
    {
      label: 'Open',
      key: 'open',
      value: allCounts?.open || 0,
    },
    {
      label: 'Past',
      key: 'past',
      value: allCounts?.past || 0,
    },
    {
      label: 'Cancelled',
      key: 'cancelled',
      value: allCounts?.cancelled || 0,
    },
  ];

  return (
    <div className="font-dm-sans flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-3 py-5 text-lg font-semibold">
        <Link href="/home">
          <ArrowLeft2 className="h-6 w-6" />
        </Link>
        <div className="grow leading-[25px] -tracking-[0.72px] text-neutral-500">
          Visit Requests
        </div>
        <Link href="/requests/new">
          <Button
            type="button"
            content="New Request"
            leftIcon={<CalendarAdd className="h-6 w-6" />}
            className="bg-primary-400 rounded-md px-3! py-2! text-base! [&>div]:gap-2"
          />
        </Link>
      </div>

      <div className="flex grow flex-col gap-3 overflow-hidden px-3">
        {/* Date filter */}
        <DatePickerRow
          activeDate={queryParams.date ? new Date(queryParams.date) : null}
          onSelect={(date) => {
            if (
              queryParams.date &&
              new Date(queryParams.date).getDate() === date.getDate()
            ) {
              updateParams({ remove: ['date'] });
            } else {
              updateParams({ set: { date: date.toISOString().split('T')[0] } });
            }
          }}
        />

        {/* Text filter */}
        <Input
          placeholder="Search by customer name"
          onChange={(e) => {
            if (e.target.value) {
              updateParams({
                set: { name: e.target.value },
              });
            } else {
              updateParams({ remove: ['name'] });
            }
          }}
          leftIcon={<SearchNormal1 className="h-5 w-5 text-neutral-500" />}
        />

        {/* Tabs filter */}
        <div className="flex w-full items-center justify-between px-2 py-1">
          {TABS_DATA.map((tab, index) => (
            <Fragment key={index}>
              {index === 1 && <div className="h-[18px] w-px bg-neutral-50" />}
              <div
                className="flex cursor-pointer items-center justify-center gap-1 px-1"
                onClick={() => {
                  if (tab.key === 'all') {
                    updateParams({ remove: ['status', 'date'] });
                  } else {
                    updateParams({
                      remove: ['date'],
                      set: { status: tab.key },
                    });
                  }
                }}
              >
                <div
                  className={`truncate overflow-hidden ${(queryParams.status ?? 'all') === tab.key ? 'text-primary-400' : 'text-neutral-50'} text-xs leading-4 font-medium tracking-[-0.48px]`}
                >
                  {tab.label}
                </div>
                {getRequestsQuery.isPending ? (
                  <Skeleton className="h-5! w-5! rounded-full!" />
                ) : (
                  <div
                    className={`text-background-50 flex h-5 w-5 ${(queryParams.status ?? 'all') === tab.key ? 'bg-primary-400' : 'bg-neutral-50'} items-center justify-center rounded-[20px] p-1 text-[10px]`}
                  >
                    {tab.value}
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>

        {/* Results */}
        <RequestsList className="gap-0!" />
      </div>
    </div>
  );
};

export default Requests;
