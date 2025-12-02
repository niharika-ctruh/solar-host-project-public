'use client';
import Skeleton from '@/components/ui/Skeleton';
import { useState, useEffect } from 'react';

const DatePickerRow = ({
  activeDate,
  onSelect,
}: {
  activeDate: Date | null;
  onSelect: (date: Date) => void;
}) => {
  const [dates, setDates] = useState<Date[]>([]);

  const getDisplayDates = () => {
    const result = [];

    for (let i = 0; i < 5; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i - 2);
      result.push(newDate);
    }
    return result;
  };

  useEffect(() => {
    const data = getDisplayDates();
    setDates(data);
  }, []);

  return (
    <div className="mx-auto flex w-full items-center justify-around">
      {!dates.length
        ? Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14! w-12!" />
          ))
        : dates.map((date, i) => {
            const isActive = activeDate?.getDate() === date.getDate();

            return (
              <div
                key={i}
                onClick={() => onSelect(date)}
                className={`border-background-400 flex flex-col gap-1 ${isActive ? 'bg-primary-400' : 'background-50'} h-14 w-12 cursor-pointer items-center justify-center rounded-lg border`}
              >
                <div
                  className={`font-dm-sans text-[18px] leading-[18px] font-semibold tracking-[-0.72px] ${isActive ? 'text-background-50' : 'text-neutral-100'}`}
                >
                  {date.getDate()}
                </div>
                <div
                  className={`font-dm-sans text-xs leading-3 font-semibold tracking-[-0.48px] uppercase ${isActive ? 'text-background-400' : 'text-neutral-dark-500'}`}
                >
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DatePickerRow;
