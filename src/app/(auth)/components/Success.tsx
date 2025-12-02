import Button from '@/components/ui/Button';
import { Verify } from 'iconsax-reactjs';

const Success = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="font-dm-sans flex h-full flex-col gap-4">
      <div className="text-light-foreground flex grow flex-col items-center gap-8 pt-[25%] text-center text-2xl leading-[33px] font-semibold tracking-[-0.96px]">
        <Verify className="text-primary-400 h-32 w-32" />
        <div>Password Changed Successfully</div>
      </div>
      <Button content="Login" className="h-min" onClick={onClick} />
    </div>
  );
};

export default Success;
