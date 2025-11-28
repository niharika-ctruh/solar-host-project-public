import { useMutation } from '@tanstack/react-query';
import { loginUser, requestPasswordReset, passwordReset } from '../api';
import type { LoginUserBody } from '@/lib/types';
import { handleApiError, handleApiSuccess, saveUser } from '@/lib/utils';

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ['login-user'],
    mutationFn: (bodyData: LoginUserBody) => loginUser(bodyData),
    onSuccess: (data) => {
      saveUser({
        _id: data._id,
        token: data.token,
      });
      handleApiSuccess({ message: data.message, fallback: 'Login Successful' });
    },
    onError: (error) => handleApiError({ error }),
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (email: string) => requestPasswordReset(email),
    onSuccess: () =>
      handleApiSuccess({ message: 'Password reset link sent to your email' }),
    onError: (error) => handleApiError({ error }),
  });
};

export const usePasswordReset = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: ({ password, data }: { password: string; data: string }) =>
      passwordReset({ password, data }),
    onSuccess: () =>
      handleApiSuccess({ message: 'Password reset successfully' }),
    onError: (error) => handleApiError({ error }),
  });
};
