'use client';
import { VISIT_TABS_DATA } from '@/data';
import { ArrowLeft2, CalendarAdd, SearchNormal1 } from 'iconsax-reactjs';
import VisitCard from './components/VisitCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Skeleton from '@/components/ui/Skeleton';
import Input from '@/components/ui/Input';
import useQueryParams from '@/hooks/useQueryParams';
import { Fragment } from 'react/jsx-runtime';
import { TVisitData } from '@/lib/types';
import { useGetVisits } from '@/services/visits-service';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useRef } from 'react';
import VisitCardSkeleton from '@/components/skeleton/VisitCardSkeleton';
import ShowError from '@/components/ui/ShowError';
import EmptyData from '@/components/ui/EmptyData';

const Visits = () => {
  const { queryParams, updateParams } = useQueryParams();
  const getVisitsQuery = useGetVisits();
  const { ref, inView } = useInView();
  const currentTab = queryParams.tab ?? 'all';
  const prevTab = useRef(currentTab);
  const isTabChanged = prevTab.current !== currentTab;

  const allStatusFilters: Record<string, string> =
    getVisitsQuery.data?.pages?.[0]?.counts ?? {};

  const allStatusFiltersKeysLength = Object.keys(allStatusFilters)?.length;

  const allVisits = getVisitsQuery.data?.pages?.flatMap(
    (data) => data?.data as TVisitData,
  );

  const STATUS_FILTERS_DATA = useMemo(
    () =>
      Object.entries(allStatusFilters)?.map(([key, value]) => ({
        label: key,
        key: key.toLocaleLowerCase(),
        value: value,
      })),
    [allStatusFilters],
  );

  useEffect(() => {
    prevTab.current = currentTab;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.tab]);

  useEffect(() => {
    if (
      inView &&
      getVisitsQuery?.hasNextPage &&
      !getVisitsQuery?.isFetchingNextPage
    ) {
      getVisitsQuery?.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, getVisitsQuery?.hasNextPage, getVisitsQuery?.fetchNextPage]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between gap-2 px-3 py-5 text-lg font-semibold">
        <Link href="/home">
          <ArrowLeft2 size="24" />
        </Link>
        <div className="grow leading-[25px] -tracking-[0.72px] text-neutral-500">
          Scheduled Visits
        </div>
        <Link href="/requests/new">
          <Button
            type="button"
            content="New Request"
            leftIcon={<CalendarAdd size="24" />}
            className="bg-primary-400 rounded-md px-3! py-2! text-base! [&>div]:gap-2"
          />
        </Link>
      </header>

      {/* Content */}
      <div className="flex grow flex-col gap-3 overflow-hidden px-3">
        {/* Tab filter */}
        <div className="bg-background-400 flex w-full items-center justify-around gap-2 rounded-lg p-1">
          {VISIT_TABS_DATA.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                if (data.key === 'all') {
                  updateParams({ remove: ['tab'] });
                } else {
                  updateParams({
                    set: { tab: data.key },
                  });
                }
              }}
              className={`h-full w-full cursor-pointer rounded-md py-2 text-center text-sm/5 font-semibold text-neutral-500 ${
                (queryParams.tab ?? 'all') === data.key
                  ? 'bg-white'
                  : 'bg-transparent'
              }`}
            >
              {data.label}
            </div>
          ))}
        </div>

        {/* Text filter */}
        <Input
          placeholder="Search by customer name or host name"
          onChange={(e) => {
            if (e.target.value) {
              updateParams({
                set: { search: e.target.value },
              });
            } else {
              updateParams({ remove: ['search'] });
            }
          }}
          defaultValue={queryParams.search}
          leftIcon={<SearchNormal1 size="20" className="text-neutral-500" />}
        />

        {/* Status filter */}
        {(!getVisitsQuery.data && getVisitsQuery.isPending) || isTabChanged ? (
          <div className="flex w-full shrink-0 items-center gap-4 px-2 py-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5!" />
            ))}
          </div>
        ) : !getVisitsQuery.isError && allStatusFiltersKeysLength ? (
          <div className="flex w-full shrink-0 items-center gap-4 overflow-x-scroll px-2 py-1">
            {STATUS_FILTERS_DATA.map((status, index) => (
              <Fragment key={index}>
                {index === 1 && (
                  <div className="h-full w-px shrink-0 bg-neutral-50" />
                )}
                <div
                  className="flex cursor-pointer items-center justify-center gap-1 px-1"
                  onClick={() => {
                    if (status.key === 'all') {
                      updateParams({ remove: ['status'] });
                    } else {
                      updateParams({
                        set: { status: status.key },
                      });
                    }
                  }}
                >
                  <div
                    className={`truncate overflow-hidden ${(queryParams.status ?? 'all') === status.key ? 'text-primary-400' : 'text-neutral-50'} text-xs leading-4 font-medium tracking-[-0.48px]`}
                  >
                    {status.label}
                  </div>
                  <div
                    className={`text-background-50 flex h-5 w-5 ${(queryParams.status ?? 'all') === status.key ? 'bg-primary-400' : 'bg-neutral-50'} items-center justify-center rounded-[20px] p-1 text-[10px]`}
                  >
                    {status.value}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <></>
        )}

        {/* Results */}
        <div className="flex grow flex-col gap-3 overflow-hidden overflow-y-scroll">
          {getVisitsQuery.isPending || getVisitsQuery.isFetching ? (
            Array.from({ length: 4 }).map((_, i) => (
              <VisitCardSkeleton key={i} />
            ))
          ) : getVisitsQuery.isError ? (
            <ShowError
              title="Something went wrong!"
              description="Error loading visits. Please try again later."
            />
          ) : !allVisits?.length ? (
            <EmptyData content="No appointments found!" className="w-full" />
          ) : (
            allVisits.map((visit, index) => (
              <div
                key={`${visit._id}-${index}`}
                ref={index === allVisits.length - 1 ? ref : null}
                className="w-full"
              >
                <VisitCard key={visit._id} data={visit} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Visits;
