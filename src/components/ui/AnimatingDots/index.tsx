import { FC } from 'react';

const AnimatingDots: FC<{ color: string }> = ({ color }) => {
  return (
    <div className="flex h-full space-x-3 items-center">
      <div
        className={`animate-pulse-scale h-[7px] w-[7px] rounded-full ${color}`}
      ></div>
      <div
        className={`animate-pulse-scale h-[7px] w-[7px] rounded-full ${color}`}
        style={{ animationDelay: '0.3s' }}
      ></div>
      <div
        className={`animate-pulse-scale h-[7px] w-[7px] rounded-full ${color}`}
        style={{ animationDelay: '0.6s' }}
      ></div>
    </div>
  );
};

export default AnimatingDots;
