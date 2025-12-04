'use client';
import { ArrowLeft2, CloseCircle } from 'iconsax-reactjs';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import RescheduleModal from '../components/RescheduleModal';
import CancelModal from '../components/CancelModal';
import { TVisitData } from '@/lib/types';
import { useGetVisitById } from '@/services/visits-service';
import ShowError from '@/components/ui/ShowError';
import EmptyData from '@/components/ui/EmptyData';
import VisitDetailCardSkeleton from '@/components/skeleton/VisitDetailCardSkeleton';
import VisitDetailCard from './components/VisitDetailCard';
import useCountdown from '@/hooks/useCountdown';

const VisitDetail = () => {
  const getVisitByIdQuery = useGetVisitById();

  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const selectedVisit = getVisitByIdQuery.data?.data as TVisitData;

  const countdownInput = selectedVisit
    ? {
        date: selectedVisit.date,
        time: selectedVisit.timeSlot,
        status: selectedVisit.status,
      }
    : null;

  const timeLeft = useCountdown(countdownInput);

  const isCancelled = selectedVisit?.status === 'cancelled';
  const isScheduled = ['visit_scheduled', 'visit_rescheduled'].includes(
    selectedVisit?.status,
  );

  return (
    <div className="bg-background-50 font-dm-sans fixed inset-0 z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col">
      {/* Header */}
      <header className="flex min-h-20 items-center justify-between gap-2 px-3 py-5 text-lg font-semibold">
        <Link href="/visits" className="cursor-pointer">
          <ArrowLeft2 size="24" />
        </Link>
        <div className="grow leading-[25px] -tracking-[0.72px] text-neutral-500">
          Visit Details
        </div>
        {selectedVisit && selectedVisit.status !== 'completed' && (
          <div className="flex flex-col items-end">
            <p
              className={`text-xs/4 font-medium ${
                isCancelled ? 'text-red-900' : 'text-neutral-500'
              }`}
            >
              {isCancelled ? 'Cancelled by' : 'Visit in'}
            </p>
            <p className="text-base/5.5 font-semibold">
              {isCancelled ? 'You' : timeLeft}
            </p>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="mt-2 grow space-y-3 px-3">
        {isCancelled && (
          <div className="flex w-full items-center gap-2 rounded-lg border border-red-900 p-5">
            <CloseCircle
              size="32"
              className="shrink-0 text-red-900"
              variant="Bold"
            />
            <span className="text-base/4 font-semibold text-red-900">
              Visit cancelled
            </span>
          </div>
        )}
        {getVisitByIdQuery.isPending ? (
          <VisitDetailCardSkeleton />
        ) : getVisitByIdQuery.isError ? (
          <ShowError
            title="Something went wrong!"
            description="Error loading visit details. Please try again later."
          />
        ) : !selectedVisit ? (
          <EmptyData content="No details found!" />
        ) : (
          <VisitDetailCard data={selectedVisit} isScheduled={isScheduled} />
        )}
      </div>
      {isScheduled && (
        <div className="flex items-center gap-2.5 pb-4">
          <Button
            variant="tertiary"
            className="bg-transparent text-neutral-500"
            content="Reschedule Visit"
            onClick={() => setIsRescheduleModalOpen(true)}
          />
          <Button
            variant="tertiary"
            className="bg-transparent text-red-900"
            content="Cancel Visit"
            onClick={() => setIsCancelModalOpen(true)}
          />
        </div>
      )}

      <RescheduleModal
        isRescheduleModalOpen={isRescheduleModalOpen}
        setIsRescheduleModalOpen={setIsRescheduleModalOpen}
        data={selectedVisit}
      />
      <CancelModal
        isCancelModalOpen={selectedVisit && isCancelModalOpen}
        setIsCancelModalOpen={setIsCancelModalOpen}
        data={selectedVisit}
      />
    </div>
  );
};

export default VisitDetail;
