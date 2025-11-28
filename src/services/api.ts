import type { LoginUserBody } from '@/lib/types';
import { handleThrowError } from '@/lib/utils';
import axios from 'axios';

const GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL;

const userServicePublic = axios.create({
  baseURL: GATEWAY_BASE_URL,
});

// USER SERVICE

export const loginUser = async (bodyData: LoginUserBody) => {
  try {
    const response = await userServicePublic.post('/auth/login', bodyData);
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await userServicePublic.post(
      '/auth/request-password-reset',
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const passwordReset = async ({
  password,
  data,
}: {
  password: string;
  data: string;
}) => {
  try {
    const response = await userServicePublic.post(
      `/auth/reset-password?data=${data}`,
      {
        password,
      },
    );
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};
