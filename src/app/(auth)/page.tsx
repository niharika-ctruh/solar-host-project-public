'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  useLoginUser,
  usePasswordReset,
  useRequestPasswordReset,
} from '../../services/user-service';
import { useRouter } from 'next/navigation';
import { LOGIN_STAGES } from '@/data';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Success from './components/Success';
import LoginForm from './components/LoginForm';
import { getUser, handleApiError, handleApiSuccess } from '@/lib/utils';

const Login = () => {
  const router = useRouter();
  const userLoginQuery = useLoginUser();
  const requestPasswordResetQuery = useRequestPasswordReset();
  const passwordResetQuery = usePasswordReset();
  const encryptedData =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('data') || ''
      : '';
  const [stage, setStage] = useState<(typeof LOGIN_STAGES)[number]>(
    encryptedData ? 'resetPassword' : 'login',
  );
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const user = getUser();
    if (user) {
      router.replace('/home');
      return;
    }
  }, []);

  return (
    <div className="m-auto flex h-screen max-w-[300px] flex-col items-center justify-center gap-8">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        className="h-12 w-[71px]"
        width={0}
        height={0}
        sizes="100vw"
      />

      <div className="flex w-full flex-col gap-4">
        {/* HEADING */}
        <div className="flex flex-col gap-2">
          <div className="font-dm-sans text-light-foreground text-center text-2xl leading-[33px] font-semibold tracking-[-0.96px]">
            {stage === 'login'
              ? 'Login to your account'
              : stage === 'forgotPassword'
                ? 'Recover Your Password'
                : stage === 'resetPassword'
                  ? 'Create New Password'
                  : ''}
          </div>
          {stage === 'login' && (
            <div className="font-dm-sans text-light-muted-foreground text-center text-sm leading-[19px] font-normal tracking-[-0.56px]">
              Enter your email below to login to your account
            </div>
          )}
        </div>

        {/* FORMS */}
        {stage === 'login' ? (
          <LoginForm
            onSubmit={(data) => {
              userLoginQuery.mutate(
                {
                  email: data.email,
                  password: data.password,
                },
                {
                  onSuccess: (data) => {
                    handleApiSuccess({
                      message: data.message,
                      fallback: 'Login Successful',
                    });
                    router.replace('/home');
                  },
                  onError: (error) => handleApiError({ error }),
                },
              );
            }}
            handleForgotPassword={() => setStage('forgotPassword')}
            isLoading={userLoginQuery.isPending}
          />
        ) : stage === 'forgotPassword' ? (
          <ForgotPasswordForm
            onSubmit={(data) => {
              setEmail(data.email);
              requestPasswordResetQuery.mutate(data.email, {
                onSuccess: () =>
                  handleApiSuccess({
                    message: 'Password reset link sent to your email',
                  }),
                onError: (error) => handleApiError({ error }),
              });
            }}
            isLoading={requestPasswordResetQuery.isPending}
          />
        ) : stage === 'resetPassword' ? (
          <ResetPasswordForm
            email={email}
            onSubmit={(data) => {
              passwordResetQuery.mutate(
                {
                  password: data.newPassword,
                  data: encryptedData,
                },
                {
                  onSuccess: () => {
                    handleApiSuccess({
                      message: 'Password reset successfully',
                    });
                    router.replace('/');
                    setStage('success');
                  },
                  onError: (error) => handleApiError({ error }),
                },
              );
            }}
            isLoading={passwordResetQuery.isPending}
          />
        ) : stage === 'success' ? (
          <Success onClick={() => setStage('login')} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Login;
