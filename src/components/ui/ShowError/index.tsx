import { InfoCircle } from 'iconsax-reactjs';

const ShowError = ({
  title,
  description,
  className = '',
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={`font-dm-sans flex h-full flex-col items-center justify-center p-6 text-center ${className}`}
    >
      <InfoCircle className="h-12 w-12 text-red-900" />
      <div className="mt-2 mb-1 text-xl leading-6 font-semibold text-neutral-500">
        {title}
      </div>
      <div className="text-sm leading-5 font-normal">{description}</div>
    </div>
  );
};

export default ShowError;
