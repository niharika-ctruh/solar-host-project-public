import { Dispatch, SetStateAction } from 'react';
import Modal from '../../../../components/ui/Modal';
import { CalendarTick, Clock, InfoCircle, Location } from 'iconsax-reactjs';
import Button from '@/components/ui/Button';
import { TVisitData } from '@/lib/types';
import { to12Hour } from '@/lib/utils';
import { useCancelVisitRequest } from '@/hooks/useCancelVisitRequest';

const CancelModal = ({
  isCancelModalOpen,
  setIsCancelModalOpen,
  data,
}: {
  isCancelModalOpen: boolean;
  setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
  data: TVisitData;
}) => {
  const { handleCancelRequest, cancelRequestQuery } = useCancelVisitRequest();

  if (!data) return;

  return (
    <Modal
      open={isCancelModalOpen}
      onClose={() => setIsCancelModalOpen(false)}
      className="p-5!"
    >
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col items-center gap-3">
          <InfoCircle size={84} className="text-red-900" variant="Bold" />
          <span className="px-10 text-center text-base/5.5 font-semibold text-neutral-500">
            Are you sure you want to cancel this visit?
          </span>
        </div>
        <div className="flex items-center justify-start gap-3 text-left text-sm/6 text-neutral-500">
          <p className="bg-primary-400 flex w-11 shrink-0 flex-col items-center justify-center rounded-md p-1 text-white">
            <span className="text-xl/7 font-semibold">
              {new Date(data.date).toLocaleDateString('default', {
                day: 'numeric',
              })}
            </span>
            <span className="text-xs/4 font-normal">
              {new Date(data.date).toLocaleDateString('default', {
                month: 'short',
              })}
            </span>
          </p>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-primary-400 inline-flex items-center gap-0.5 text-base/6 font-semibold">
                <Clock variant="Bold" className="text-primary-400 shrink-0" />
                {to12Hour(data.timeSlot)}
              </span>
              <span
                className={`font-dm-sans text-primary-400 bg-primary-200 inline-flex h-min items-start gap-1 rounded-full px-1.5 py-1 text-xs font-semibold!`}
              >
                <CalendarTick
                  size="16"
                  variant="Bold"
                  className="text-primary-400"
                />
                Visit scheduled
              </span>
            </div>
            <span className="inline-flex items-center gap-0.5 text-xs/4.75 font-medium text-neutral-50">
              <Location variant="Bold" className="shrink-0 text-neutral-50" />
              {data.customer.address}
            </span>
          </div>
        </div>

        <hr className="border-background-400 border-t" />
        <div className="flex items-center gap-2.5">
          <Button
            variant="tertiary"
            className="cursor-pointer bg-transparent text-red-900"
            content="Yes, Cancel"
            onClick={() =>
              handleCancelRequest({
                message: 'Request cancelled successfully!',
                onSuccess: () => setIsCancelModalOpen(false),
              })
            }
            isLoading={cancelRequestQuery.isPending}
          />
          <Button
            variant="tertiary"
            content="Don't Cancel"
            onClick={() => setIsCancelModalOpen(false)}
            className="bg-background-400! cursor-pointer text-neutral-500"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
