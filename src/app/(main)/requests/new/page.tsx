'use client';
import {
  LeftChevronIcon,
  CalendarIcon,
  ClockIcon,
  VerifyIcon,
} from '@/components/icons';
import { generateTimeSlots } from '@/data';
import Input from '@/components/ui/Input';
import { Clock, Location } from 'iconsax-reactjs';
import { Fragment, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSendRequest } from '@/services/requests-service';
import { SendRequestBody, SendRequestFormType } from '@/lib/types';
import { getCoordinatesFromAddress } from '@/services/api';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleApiError } from '@/lib/utils';

const NewRequest = () => {
  const [currentStep, setCurrentStep] = useState<'step1' | 'step2'>('step1');
  const router = useRouter();
  const timeSlots = generateTimeSlots();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<SendRequestFormType>({
    defaultValues: {
      dateOfVisit: null,
      timeOfVisit: '',
      address: '',
      customerName: '',
      customerId: '',
    },
    mode: 'onChange',
  });

  const sendRequestQuery = useSendRequest();

  const onSubmit: SubmitHandler<SendRequestFormType> = async (data) => {
    const coordinates = await getCoordinatesFromAddress(data.address);

    if (coordinates) {
      const formDataWithCoordinates: SendRequestBody = {
        customerId: data?.customerId,
        address: data?.address,
        name: data?.customerName,
        coordinates: [coordinates?.lat, coordinates?.lng],
        date: data?.dateOfVisit!.toISOString(),
        timeSlot: data?.timeOfVisit,
      };
      sendRequestQuery.mutate(formDataWithCoordinates, {
        onSuccess: () => {
          setCurrentStep('step2');
          reset();
        },
        onError: (error) => handleApiError({ error }),
      });
    }
  };

  const handleBackToRequest = () => {
    reset();
    setCurrentStep('step1');
    router.back();
  };

  useEffect(() => {
    if (sendRequestQuery.isSuccess && currentStep === 'step2') {
      const hosts = sendRequestQuery?.data?.request?.hostsNotified ?? 0;
      toast.success(
        `${hosts} host's have been notified about your visit request.`,
        {
          duration: 3000,
        },
      );
    }
  }, [
    sendRequestQuery.isSuccess,
    currentStep,
    sendRequestQuery?.data?.request?.hostsNotified,
  ]);

  return (
    <div className="bg-background-50 font-dm-sans flex h-full flex-col overflow-y-scroll px-6 pb-6">
      <Fragment>
        {currentStep === 'step1' && (
          <Fragment>
            <header className="mx-auto flex w-full max-w-2xl items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <LeftChevronIcon
                  className="cursor-pointer"
                  onClick={handleBackToRequest}
                />
                <p className="text-lg/6.25 font-semibold text-neutral-500">
                  New Visit Request
                </p>
              </div>
              <Button
                onClick={handleBackToRequest}
                variant="secondary"
                content="Cancel"
                className="border-background-400! w-min cursor-pointer rounded-lg border p-3! text-base! font-semibold text-neutral-500!"
              />
            </header>

            <form className="mx-auto flex w-full max-w-2xl flex-1 grow flex-col gap-4 pb-6">
              <div className="flex flex-col gap-3">
                <p className="text-base/5.5 font-semibold">Customer Location</p>
                <div className="flex flex-col gap-1">
                  <textarea
                    {...register('address', {
                      required: 'Address is required',
                    })}
                    placeholder="Enter your address"
                    rows={4}
                    className={`w-full rounded-md border p-3 text-sm leading-tight ${errors.address ? 'border-red-900' : 'border-gray-400'} bg-background-50 text-primary font-normal`}
                  />
                  {errors.address && (
                    <p className="mt-2 w-full text-left text-sm text-red-900">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <hr className="border-background-400 border-t" />

              <div className="flex flex-col gap-3">
                <p className="text-base/5.5 font-semibold">Customer Details</p>
                <Input
                  {...register('customerName', {
                    required: 'Customer Name is required',
                    pattern: {
                      value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                      message:
                        'Customer name should contain only letters and spaces',
                    },
                  })}
                  wrapperClassName="gap-1!"
                  label="Customer Name"
                  placeholderText="Enter your customer name"
                  type="text"
                  errorText={errors?.customerName?.message as string}
                  className="text-text-primary! p-3!"
                />
                <Input
                  {...register('customerId', {
                    required: 'Customer ID is required',
                  })}
                  wrapperClassName="gap-1!"
                  label="Customer ID"
                  placeholderText="Enter your customer id"
                  type="text"
                  errorText={errors?.customerId?.message as string}
                  className="text-text-primary! p-3!"
                />
              </div>

              <hr className="border-background-400 border-t" />

              <div>
                <p className="text-base/5.5 font-semibold">Visit Preference</p>
                <div className="mt-3 flex items-start gap-3">
                  <div className="flex w-full flex-col gap-1">
                    <label
                      className={`text-xs font-medium tracking-[-0.56px] ${errors.dateOfVisit ? 'text-red-900' : 'text-gray-600'}`}
                    >
                      Date of Visit
                    </label>
                    <Controller
                      control={control}
                      name="dateOfVisit"
                      rules={{ required: 'Date of Visit is required' }}
                      render={({ field: { onChange, value } }) => (
                        <div className="relative w-full">
                          <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-500" />
                          <DatePicker
                            selected={value}
                            onChange={onChange}
                            dateFormat="dd MMM, yy"
                            placeholderText="Select date"
                            className="focus:ring-primary-400 w-full cursor-pointer rounded-md border border-gray-400! bg-white p-3 pr-10 text-sm outline-none focus:ring-2"
                            minDate={(() => {
                              const tomorrow = new Date();
                              tomorrow.setDate(tomorrow.getDate() + 1);
                              return tomorrow;
                            })()}
                          />
                        </div>
                      )}
                    />
                    {errors.dateOfVisit && (
                      <p className="mt-1 text-sm text-red-900">
                        {errors.dateOfVisit.message}
                      </p>
                    )}
                  </div>

                  {/* Time Field */}
                  <div className="flex w-full flex-col gap-1">
                    <label
                      className={`text-xs font-medium tracking-[-0.56px] ${errors.timeOfVisit ? 'text-red-900' : 'text-gray-600'}`}
                    >
                      Time of Visit
                    </label>

                    <div className="bg-background-50 flex items-center rounded-md border border-gray-400 p-3">
                      <ClockIcon className="pointer-events-none shrink-0 text-blue-600" />
                      <select
                        {...register('timeOfVisit', {
                          required: 'Time of Visit is required',
                        })}
                        defaultValue=""
                        className={`ml-2 w-full cursor-pointer appearance-none border-none bg-transparent text-sm outline-none ${errors.timeOfVisit ? 'text-red-900' : 'text-text-primary'}`}
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
                    {errors.timeOfVisit && (
                      <p className="mt-1 text-sm text-red-900">
                        {errors.timeOfVisit.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {sendRequestQuery.isPending && (
              <div className="fixed inset-0 z-60 flex min-h-screen items-center justify-center gap-4 bg-white/80">
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  className="h-24 w-28 animate-pulse"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            )}
          </Fragment>
        )}

        {sendRequestQuery.isSuccess && currentStep === 'step2' && (
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 pt-6">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              className="h-12 w-20"
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="flex grow flex-col items-center justify-center gap-8">
              <VerifyIcon />
              <div className="text-center text-2xl/8.5 font-semibold">
                Visit Request <br /> Successfully Sent!
              </div>
              <div className="border-primary-200 bg-primary-50 flex w-full max-w-md min-w-xs flex-col gap-3 self-start rounded-2xl border p-5">
                <div className="flex flex-col gap-1 text-left text-sm/6 text-neutral-500">
                  <span className="mb-1 text-xs/4.75 font-medium tracking-[-0.48px]">
                    Customer Details
                  </span>
                  <span className="text-base/6 font-semibold tracking-[-0.64px]">
                    {sendRequestQuery?.data?.request?.customer?.name}
                  </span>
                  <span className="text-xs/4.75 font-medium text-neutral-50">
                    {sendRequestQuery?.data?.request?.customer?.customerId}
                  </span>
                </div>
                <hr className="border-background-400 border-t" />
                <div className="flex items-center justify-start gap-1 text-left text-sm/6 text-neutral-500">
                  <p className="bg-primary-400 flex w-11 shrink-0 flex-col items-center justify-center rounded-md p-1 text-white">
                    <span className="text-xl/7 font-semibold">
                      {sendRequestQuery?.data?.request?.request?.date
                        ? new Date(
                            sendRequestQuery.data.request.request.date,
                          ).getDate()
                        : ''}
                    </span>
                    <span className="text-xs/4 font-normal">
                      {sendRequestQuery?.data?.request?.request?.date
                        ? new Date(
                            sendRequestQuery.data.request.request.date,
                          ).toLocaleString('default', {
                            month: 'short',
                          })
                        : ''}
                    </span>
                  </p>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary-400 inline-flex items-center gap-0.5 text-base/6 font-semibold">
                      <Clock
                        variant="Bold"
                        className="text-primary-400 shrink-0"
                      />
                      {sendRequestQuery?.data?.request?.request?.timeSlot}
                    </span>
                    <span className="inline-flex items-start gap-0.5 text-xs/4.75 font-medium text-neutral-50">
                      <Location
                        variant="Bold"
                        className="shrink-0 text-neutral-50"
                      />
                      {sendRequestQuery?.data?.request?.customer?.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'step1' ? (
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={
              isValid && !sendRequestQuery.isPending ? 'primary' : 'disable'
            }
            content="Submit Request"
            className="bg-primary-400 mx-auto mt-6 h-min w-full max-w-2xl cursor-pointer items-center justify-center rounded-lg px-4 py-3 font-semibold text-white outline-none disabled:cursor-not-allowed disabled:opacity-30"
          />
        ) : (
          <div className="mx-auto flex w-full max-w-2xl items-center gap-2.5">
            <Button
              onClick={handleBackToRequest}
              variant="secondary"
              content="Home"
              className="text-black-300 mx-auto mt-6 h-min w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 font-semibold outline-none"
            />

            <Button
              onClick={handleBackToRequest}
              variant={isValid ? 'primary' : 'disable'}
              content="View Request"
              className="bg-primary-400 mx-auto mt-6 h-min w-full max-w-2xl cursor-pointer items-center justify-center rounded-lg px-4 py-3 font-semibold text-white outline-none disabled:cursor-not-allowed disabled:opacity-30"
            />
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default NewRequest;
