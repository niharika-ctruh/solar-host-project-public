import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRequestPasswordReset } from '@/services/user-service';
import { useForm } from 'react-hook-form';

const ForgotPasswordForm = ({
  isLoading = false,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: (data: { email: string }) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="font-dm-sans text-light-muted-foreground text-center text-sm leading-[19px] font-normal tracking-[-0.56px]">
          Enter your email address to reset your password
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-dm-sans text-background-dark-500 text-sm font-medium tracking-[-0.56px]">
            Email
          </label>
          <Input
            {...register('email', {
              required: 'Email is required',
              validate: {
                noSpaces: (v) => !/\s/.test(v) || 'Email cannot contain spaces',
                validEmailRegex: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  'Invalid email address',
              },
              setValueAs: (v) => v.trim().toLowerCase(),
            })}
            placeholderText="ashok.k@solarsquare.in"
            type="text"
            errorText={errors?.email?.message as string}
          />
        </div>
        <Button type="submit" content="Send Code" isLoading={isLoading} />
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
