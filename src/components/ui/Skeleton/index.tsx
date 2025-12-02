const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`h-4 w-full animate-pulse rounded-sm bg-gray-300 ${className}`}
    />
  );
};

export default Skeleton;
