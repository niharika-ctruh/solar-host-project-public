import { Dispatch, SetStateAction, useEffect } from 'react';
import Modal from '../../../../components/ui/Modal';
import { CalendarTick, Clock, InfoCircle, Location } from 'iconsax-reactjs';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { generateTimeSlots } from '@/data';
import 'react-datepicker/dist/react-datepicker.css';
import { TVisitData, UpdateRequestBody } from '@/lib/types';
import { handleApiError, handleApiSuccess, to12Hour } from '@/lib/utils';
import { useUpdateRequest } from '@/services/requests-service';
import toast from 'react-hot-toast';

type RescheduleModalFormType = {
  date: Date;
  timeSlot: string;
};

const RescheduleModal = ({
  isRescheduleModalOpen,
  setIsRescheduleModalOpen,
  data,
}: {
  isRescheduleModalOpen: boolean;
  setIsRescheduleModalOpen: Dispatch<SetStateAction<boolean>>;
  data: TVisitData;
}) => {
  const updateRequestQuery = useUpdateRequest();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RescheduleModalFormType>({ mode: 'onChange' });
  const timeSlots = generateTimeSlots();

  const onSubmit = (form: RescheduleModalFormType) => {
    const originalDate = new Date(data.date);

    const isSameDate =
      form.date.getFullYear() === originalDate.getFullYear() &&
      form.date.getMonth() === originalDate.getMonth() &&
      form.date.getDate() === originalDate.getDate();

    const isSameTime = form.timeSlot === data.timeSlot;

    if (isSameDate && isSameTime) {
      toast.error('Please choose a new slot for rescheduling!');
      return;
    }

    let payload;
    if (!isSameDate) {
      const utcDate = new Date(
        Date.UTC(
          form.date.getFullYear(),
          form.date.getMonth(),
          form.date.getDate(),
        ),
      ).toISOString();
      payload = { date: utcDate };
    }

    if (!isSameTime) {
      payload = { timeSlot: form.timeSlot };
    }
    updateRequestQuery.mutate(payload as UpdateRequestBody, {
      onSuccess: () => {
        handleApiSuccess({
          message: 'Visit rescheduled successfully!',
        });
        setIsRescheduleModalOpen(false);
      },
      onError: (error) => handleApiError({ error }),
    });
  };
  useEffect(() => {
    if (data) {
      setValue('date', new Date(data.date));
      setValue('timeSlot', data.timeSlot);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) return;

  return (
    <Modal
      open={isRescheduleModalOpen}
      onClose={() => setIsRescheduleModalOpen(false)}
      className="p-5!"
    >
      <form
        className="flex flex-col gap-6 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-3">
          <InfoCircle size={84} className="text-yellow-500" variant="Bold" />
          <span className="text-base/5.5 font-semibold text-neutral-500">
            Please select the new date and time
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
        <div className="flex flex-col gap-3">
          <p className="text-base/5.5 font-semibold text-neutral-500">
            Reschedule to
          </p>
          <div className="flex items-start gap-3">
            <div className="flex w-full flex-col gap-1">
              <label
                className={`text-xs font-medium tracking-[-0.56px] ${errors.date ? 'text-red-900' : 'text-gray-600'}`}
              >
                Select Date
              </label>
              <Controller
                control={control}
                name="date"
                rules={{ required: 'Date of Visit is required' }}
                render={({ field: { onChange, value } }) => (
                  <div className="relative w-full">
                    <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-500" />
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      dateFormat="dd MMM, yy"
                      placeholderText="Select date"
                      className="focus:ring-primary-400 w-full cursor-pointer rounded-md border border-gray-400! bg-white p-3 text-sm outline-none focus:ring-2"
                      minDate={(() => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        return tomorrow;
                      })()}
                    />
                  </div>
                )}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-900">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Time Field */}
            <div className="flex w-full flex-col gap-1">
              <label
                className={`text-xs font-medium tracking-[-0.56px] ${errors.timeSlot ? 'text-red-900' : 'text-gray-600'}`}
              >
                Select Time
              </label>

              <Controller
                control={control}
                name="timeSlot"
                rules={{ required: 'Time of Visit is required' }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="bg-background-50 flex items-center rounded-md border border-gray-400 p-3">
                      <ClockIcon className="pointer-events-none shrink-0 text-blue-600" />
                      <select
                        value={value}
                        onChange={onChange}
                        className={`ml-2 w-full cursor-pointer appearance-none border-none bg-transparent text-sm outline-none ${
                          errors.timeSlot ? 'text-red-900' : 'text-text-primary'
                        }`}
                      >
                        <option value="" disabled>
                          Select Time
                        </option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }}
              />
              {errors.timeSlot && (
                <p className="mt-1 text-sm text-red-900">
                  {errors.timeSlot.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <hr className="border-background-400 border-t" />
        <div className="flex items-center gap-2.5">
          <Button
            variant="tertiary"
            className="cursor-pointer bg-transparent text-neutral-500"
            content="Close"
            onClick={() => setIsRescheduleModalOpen(false)}
          />
          <Button
            variant="primary"
            type="submit"
            content="Send Request"
            className="cursor-pointer"
          />
        </div>
      </form>
    </Modal>
  );
};

export default RescheduleModal;
