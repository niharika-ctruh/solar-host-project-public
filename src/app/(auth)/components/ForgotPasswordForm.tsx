import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
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
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <div className="flex h-full flex-col justify-between gap-4">
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
          label="Email"
          placeholderText="ashok.k@solarsquare.in"
          type="text"
          errorText={errors?.email?.message as string}
        />
        <Button
          type="submit"
          content="Send Code"
          isLoading={isLoading}
          className="h-min"
        />
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
