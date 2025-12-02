import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

const LoginForm = ({
  onSubmit,
  handleForgotPassword,
  isLoading,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  handleForgotPassword: () => void;
  isLoading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-dm-sans grow">
      <div className="flex h-full flex-col gap-4">
        <div className="flex grow flex-col gap-4">
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
            type="text"
            label="Email"
            errorText={errors?.email?.message as string}
          />
          <div className="relative">
            <Input
              {...register('password', {
                required: 'Password required',
                validate: {
                  noSpaces: (v) =>
                    /^\S*$/.test(v) || "Password can't contain spaces",
                  upper: (v) =>
                    /[A-Z]/.test(v) ||
                    'Password must contain at least one uppercase letter',
                  lower: (v) =>
                    /[a-z]/.test(v) ||
                    'Password must contain at least one lowercase letter',
                  number: (v) =>
                    /\d/.test(v) || 'Password must contain at least one number',
                  special: (v) =>
                    /[@$!%*?&#]/.test(v) ||
                    'Password must contain at least one special character',
                  minLength: (v) =>
                    v.length >= 6 || 'Password must be at least 6 characters',
                  maxLength: (v) =>
                    v.length <= 20 || 'Password cannot exceed 20 characters',
                },
                setValueAs: (v) => v.trim(),
              })}
              type="password"
              label="Password"
              errorText={errors?.password?.message as string}
            />
            <div
              className="text-background-dark-500 absolute top-0 right-0 cursor-pointer text-center text-sm leading-[19px] font-normal -tracking-[0.56px]"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </div>
          </div>
        </div>
        <Button
          type="submit"
          content="Login"
          isLoading={isLoading}
          className="h-min"
        />
      </div>
    </form>
  );
};

export default LoginForm;
