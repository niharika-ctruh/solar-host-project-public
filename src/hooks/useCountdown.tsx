import { TRequestStatus } from '@/lib/types';
import { useEffect, useState } from 'react';

const useCountdown = (
  input?: {
    date: string;
    time: string;
    status: TRequestStatus;
  } | null,
) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!input) return;

    const { date, time, status } = input;

    if (status === 'completed' || status === 'cancelled') return;

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

      const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [input]);

  return timeLeft;
};

export default useCountdown;
