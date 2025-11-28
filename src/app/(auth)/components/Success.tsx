import Button from '@/components/ui/Button';

const Success = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col gap-4 px-3">
      <div className="font-dm-sans text-light-foreground text-center text-2xl leading-[33px] font-semibold tracking-[-0.96px]">
        Password Changed Successfully
      </div>
      <Button content="Login" onClick={onClick} />
    </div>
  );
};

export default Success;
