import { useMutation } from '@tanstack/react-query';
import { loginUser, requestPasswordReset, passwordReset } from '../api';
import type { LoginUserBody } from '@/lib/types';
import { saveUser } from '@/lib/utils';

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ['login-user'],
    mutationFn: (bodyData: LoginUserBody) => loginUser(bodyData),
    onSuccess: (data, bodyData) => {
      saveUser({
        _id: data._id,
        token: data.token,
        email: bodyData.email,
      });
    },
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (email: string) => requestPasswordReset(email),
  });
};

export const usePasswordReset = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: ({ password, data }: { password: string; data: string }) =>
      passwordReset({ password, data }),
  });
};
