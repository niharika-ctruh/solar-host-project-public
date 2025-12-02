'use client';
import RequestCardSkeleton from '@/components/skeleton/RequestCardSkeleton';
import EmptyData from '@/components/ui/EmptyData';
import ShowError from '@/components/ui/ShowError';
import { RequestsListProps, TRequestData } from '@/lib/types';
import RequestCard from '../../requests/components/RequestCard';
import { LoadingIcon } from '@/components/icons';
import { useGetRequests } from '@/services/requests-service';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import DividerText from '@/components/ui/DividerText';
import Skeleton from '@/components/ui/Skeleton';
import useQueryParams from '@/hooks/useQueryParams';

const RequestsList = ({
  isTodayVisits = false,
  className = '',
}: RequestsListProps) => {
  const getRequestsQuery = useGetRequests();
  const { ref, inView } = useInView();
  const { updateParams } = useQueryParams();

  const allRequests = getRequestsQuery.data?.pages?.flatMap(
    (data) => data?.data as TRequestData,
  );

  useEffect(() => {
    if (
      inView &&
      getRequestsQuery?.hasNextPage &&
      !getRequestsQuery?.isFetchingNextPage
    ) {
      getRequestsQuery?.fetchNextPage();
    }
  }, [inView, getRequestsQuery?.hasNextPage, getRequestsQuery?.fetchNextPage]);

  useEffect(() => {
    if (isTodayVisits) {
      updateParams({
        set: {
          date: new Date().toISOString().split('T')[0],
          status: 'scheduled',
        },
      });
    }
  }, []);

  return (
    <div
      className={`flex grow flex-col items-center gap-3 overflow-hidden overflow-y-scroll ${className}`}
    >
      {getRequestsQuery.isPending || getRequestsQuery.isFetching ? (
        <>
          {isTodayVisits && <Skeleton className="h-4 w-1/3!" />}
          {Array.from({ length: 3 }).map((_, i) => (
            <RequestCardSkeleton key={i} />
          ))}
        </>
      ) : getRequestsQuery.isError ? (
        <ShowError
          title="Something went wrong!"
          description="Error loading requests. Please try again later."
        />
      ) : !allRequests?.length ? (
        <EmptyData
          content={`No ${isTodayVisits ? 'visits for today!' : 'requests found!'}`}
          className="w-full"
        />
      ) : (
        <>
          {isTodayVisits && (
            <DividerText
              text="Today's Visits (4)"
              className="w-full whitespace-nowrap uppercase **:tracking-[1.2px]"
            />
          )}
          {allRequests.map((request, index) => (
            <div
              key={request._id}
              ref={index === allRequests.length - 1 ? ref : null}
              className="w-full"
            >
              <RequestCard data={request} />
            </div>
          ))}
        </>
      )}
      {getRequestsQuery.isFetchingNextPage && (
        <LoadingIcon className="inline h-6 w-6" />
      )}
    </div>
  );
};

export default RequestsList;
