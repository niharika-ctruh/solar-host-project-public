'use client';
import DividerText from '@/components/ui/DividerText';
import RequestDetailCard from './components/RequestDetailCard';
import HostItemCard from './components/HostItemCard';
import { useGetRequestById } from '@/services/requests-service';
import { TRequestData } from '@/lib/types';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowCircleRight2, ArrowLeft2 } from 'iconsax-reactjs';
import { useParams, useRouter } from 'next/navigation';
import ShowError from '@/components/ui/ShowError';
import EmptyData from '@/components/ui/EmptyData';
import RequestDetailCardSkeleton from '@/components/skeleton/RequestDetailCardSkeleton';
import Skeleton from '@/components/ui/Skeleton';
import { useCancelVisitRequest } from '@/hooks/useCancelVisitRequest';

const RequestDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const getRequestByIdQuery = useGetRequestById();
  const { handleCancelRequest, cancelRequestQuery } = useCancelVisitRequest();

  const selectedRequest = getRequestByIdQuery.data?.data as TRequestData;
  const showHostItemCard =
    (selectedRequest?.status === 'visit_scheduled' ||
      selectedRequest?.status === 'visit_rescheduled' ||
      selectedRequest?.status === 'completed') &&
    selectedRequest?.acceptedHost;

  return (
    <div className="flex h-full flex-col gap-3 px-3">
      {/* Header */}
      <div className="flex h-20 items-center justify-between gap-2 py-5 text-lg font-semibold">
        <Link href="/requests">
          <ArrowLeft2 size="24" />
        </Link>
        <div className="grow leading-[25px] -tracking-[0.72px] text-neutral-500">
          Visit Request Detail
        </div>
        {getRequestByIdQuery.isPending ? (
          <Skeleton className="h-full! w-32!" />
        ) : selectedRequest?.status === 'pending' ? (
          <Button
            type="button"
            content="Cancel Request"
            className="w-min rounded-md bg-red-500 px-3! py-2! text-base! text-red-900"
            onClick={() =>
              handleCancelRequest({
                onSuccess: () => router.replace('/requests'),
              })
            }
            isLoading={cancelRequestQuery.isPending}
          />
        ) : selectedRequest?.status !== 'cancelled' ? (
          <Link href={`/visits/${id}`}>
            <Button
              type="button"
              content="View Visit"
              rightIcon={<ArrowCircleRight2 size="24" />}
              className="bg-background-400! rounded-md px-3! py-2! text-base! text-neutral-500 [&>div]:gap-2"
            />
          </Link>
        ) : (
          <></>
        )}
      </div>

      {/* Request details */}
      {getRequestByIdQuery.isPending ? (
        <RequestDetailCardSkeleton />
      ) : getRequestByIdQuery.isError ? (
        <ShowError
          title="Something went wrong!"
          description="Error loading request details. Please try again later."
        />
      ) : !selectedRequest ? (
        <EmptyData content="No details found!" />
      ) : (
        <RequestDetailCard
          data={{
            name: selectedRequest.customer.name,
            id: selectedRequest.customer.customerId,
            date: selectedRequest.date,
            time: selectedRequest.timeSlot,
            status: selectedRequest.status,
          }}
        />
      )}

      {/* Host details */}
      {showHostItemCard && (
        <>
          <DividerText
            text="Confirmed Host"
            className="font-medium whitespace-nowrap uppercase **:tracking-[1.2px]"
          />
          <HostItemCard
            data={{
              name: selectedRequest.acceptedHost.name,
              id: selectedRequest.acceptedHost.hostSseId,
              totalVisits: selectedRequest.acceptedHost.visitHostedCount,
              address: selectedRequest.acceptedHost.address.fullAddress,
            }}
          />
        </>
      )}
    </div>
  );
};

export default RequestDetail;
