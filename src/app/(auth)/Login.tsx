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
import {
  decryptData,
  getUser,
  handleApiError,
  handleApiSuccess,
} from '@/lib/utils';
import useQueryParams from '@/hooks/useQueryParams';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
  const userLoginQuery = useLoginUser();
  const requestPasswordResetQuery = useRequestPasswordReset();
  const passwordResetQuery = usePasswordReset();
  const { queryParams } = useQueryParams();
  const [stage, setStage] = useState<(typeof LOGIN_STAGES)[number]>('login');
  const [email, setEmail] = useState<string>('');

  const handleInvalidLink = () => {
    toast.error('Invalid or expired link');
    router.replace('/');
  };

  useEffect(() => {
    if (!queryParams.data) {
      const user = getUser();
      if (user) router.replace('/home');
      return;
    }

    const decrypted = decryptData(queryParams.data);
    if (!decrypted) return handleInvalidLink();

    let payload;
    try {
      payload = JSON.parse(decrypted);
    } catch {
      return handleInvalidLink();
    }

    if (!payload.token) return handleInvalidLink();

    let decoded;
    try {
      decoded = jwtDecode<{ email: string }>(payload.token);
    } catch {
      return handleInvalidLink();
    }

    if (!decoded.email) return handleInvalidLink();

    setEmail(decoded.email);
    setStage('resetPassword');
  }, []);

  return (
    <div className="font-dm-sans m-auto flex h-screen max-w-lg flex-col items-center justify-center gap-8 px-6 py-4">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        className="h-12 w-[71px]"
        width={0}
        height={0}
        sizes="100vw"
        loading="eager"
        priority
      />

      <div
        className={`flex w-full grow flex-col ${stage !== 'resetPassword' ? 'gap-8' : 'gap-4'}`}
      >
        {/* HEADING */}
        {stage !== 'success' && (
          <div
            className={`flex flex-col ${stage !== 'resetPassword' ? 'gap-2' : 'gap-4'}`}
          >
            <div className="text-light-foreground text-center text-2xl leading-[33px] font-semibold tracking-[-0.96px]">
              {stage === 'login'
                ? 'Login to your account'
                : stage === 'forgotPassword'
                  ? 'Recover Your Password'
                  : stage === 'resetPassword'
                    ? 'Create New Password'
                    : ''}
            </div>
            <div
              className={`text-center text-sm leading-[19px] ${stage !== 'resetPassword' ? 'text-light-muted-foreground font-normal' : 'text-background-dark-500 font-semibold'} -tracking-[0.56px]`}
            >
              {stage === 'login'
                ? 'Enter your email below to login to your account'
                : stage === 'forgotPassword'
                  ? 'Enter your email address to reset your password'
                  : stage === 'resetPassword'
                    ? `Resetting Password for ${email}`
                    : ''}
            </div>
          </div>
        )}

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
                  data: queryParams.data,
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
