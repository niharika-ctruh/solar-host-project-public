'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserData } from '@/lib/types';
import {
  getUser,
  handleApiError,
  handleApiSuccess,
  handleLogout,
} from '@/lib/utils';
import { useRequestPasswordReset } from '@/services/user-service';
import { ArrowLeft2, LogoutCurve } from 'iconsax-reactjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const requestPasswordResetQuery = useRequestPasswordReset();
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.replace('/home');
    } else {
      setUser(user);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex min-h-20 items-center justify-between gap-2 px-3 py-5 text-lg font-semibold">
        <Link href="/home">
          <ArrowLeft2 size="24" />
        </Link>
        <div className="grow leading-[25px] -tracking-[0.72px] text-neutral-500">
          Profile
        </div>
      </div>

      {/* Content */}
      <div className="flex grow flex-col gap-6 px-3 py-4">
        <div className="flex flex-col gap-3">
          <Input label="Email Address" value={user.email} disabled />
          <Input label="Role" value="Solar Consultant" disabled />
        </div>
        <Button
          content="Change Password"
          className="h-min py-[15px]! text-base!"
          onClick={() => {
            requestPasswordResetQuery.mutate(user.email, {
              onSuccess: () =>
                handleApiSuccess({
                  message: 'Password reset link sent to your email',
                }),
              onError: (error) => handleApiError({ error }),
            });
          }}
        />
        <Button
          content="Log out"
          variant="secondary"
          className="h-min border-red-900 py-[11px]! text-base! text-red-900"
          leftIcon={<LogoutCurve size="20" className="text-red-900" />}
          onClick={() => handleLogout()}
        />
      </div>
    </div>
  );
};

export default Profile;
