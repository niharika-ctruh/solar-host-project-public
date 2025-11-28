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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
            type="text"
            errorText={errors?.email?.message as string}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-dm-sans text-background-dark-500 text-sm font-medium tracking-[-0.56px]">
            Password
          </label>
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
            errorText={errors?.password?.message as string}
          />
        </div>
        <Button type="submit" content="Login" isLoading={isLoading} />
        <div
          className="font-dm-sans text-background-dark-500 cursor-pointer text-center text-sm leading-[19px] font-normal -tracking-[0.56px]"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
