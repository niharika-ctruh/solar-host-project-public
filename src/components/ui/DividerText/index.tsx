const DividerText = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <span className="bg-background-400 h-px w-full" />
      <span className="font-dm-sans text-xs tracking-[-0.48px] text-neutral-300">
        {text}
      </span>
      <span className="bg-background-400 h-px w-full" />
    </div>
  );
};

export default DividerText;
