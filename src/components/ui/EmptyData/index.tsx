import { EmptyDataIcon } from '@/components/icons';

const EmptyData = ({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={`font-dm-sans col-span-full flex h-full flex-col items-center justify-center gap-4 text-center ${className}`}
    >
      <EmptyDataIcon className="h-16 w-16" />
      <div className="text-xl leading-6 font-medium text-neutral-500">
        {content}
      </div>
    </div>
  );
};

export default EmptyData;
