import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

const ResetPasswordForm = ({
  email,
  onSubmit,
  isLoading,
}: {
  email: string;
  onSubmit: (data: { newPassword: string; confirmPassword: string }) => void;
  isLoading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ newPassword: string; confirmPassword: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Input
            {...register('newPassword', {
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
            label="New Password"
            errorText={errors?.newPassword?.message as string}
          />
          <Input
            {...register('confirmPassword', {
              required: 'Confirm the password',
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
                match: (v) =>
                  v === watch('newPassword') || 'Passwords do not match',
              },
              setValueAs: (v) => v.trim(),
            })}
            type="password"
            label="Confirm Password"
            errorText={errors?.confirmPassword?.message as string}
          />
        </div>
        <Button
          type="submit"
          content="Submit"
          isLoading={isLoading}
          className="h-min"
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
