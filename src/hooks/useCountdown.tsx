import { TRequestStatus } from '@/lib/types';
import { useEffect, useState } from 'react';

const useCountdown = ({
  date,
  time,
  status,
}: {
  date: string;
  time: string;
  status: TRequestStatus;
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (status !== 'pending') return;

    const updateTime = () => {
      const now = Date.now();

      const baseDate = new Date(date);
      const [hours, minutes] = time.split(':').map(Number);

      const expiry = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        hours,
        minutes,
        0,
        0,
      );

      const diff = expiry.getTime() - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const diffHours = Math.floor(diff / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${diffHours}h ${diffMinutes}m ${diffSeconds}s`);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [date, time, status]);

  return timeLeft;
};

export default useCountdown;
