import CryptoJS from 'crypto-js';
import type { UserData } from './types';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
export const USER_LOCAL_STORAGE_KEY = 'USER_INFO';

const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const saveUser = (data: UserData) => {
  const encryptedData = encryptData(JSON.stringify(data));
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, encryptedData);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (!user) return null;

  const result = decryptData(user);
  if (!result) return null;

  return JSON.parse(result);
};

export const clearStorages = () => {
  localStorage.clear(); // clearing the local storage
  sessionStorage.clear(); // clearing the session storage
};

export const handleLogout = (message: string = 'Logged out successfully!') => {
  setTimeout(() => {
    clearStorages();
    toast.success(message);
    window.location.href = '/';
  }, 500);
};

export const handleApiSuccess = ({
  message,
  fallback = 'Success!',
}: {
  message: string;
  fallback?: string;
}) => {
  toast.success(message || fallback);
};

export const handleApiError = ({
  error,
  fallback = 'Something went wrong!',
}: {
  error: unknown;
  fallback?: string;
}) => {
  toast.error(typeof error === 'string' ? error : fallback);
};

export const handleThrowError = ({ error }: { error: unknown }) => {
  if (error instanceof AxiosError) {
    throw error?.response?.data?.message || 'API Error Occurred';
  }
  throw 'Something went wrong';
};

export const formatDate = (isoDate: string) => {
  const d = new Date(isoDate);

  const day = d.toLocaleString('en-GB', { day: '2-digit' });
  const month = d.toLocaleString('en-GB', { month: 'short' });
  const year = d.toLocaleString('en-GB', { year: 'numeric' });

  return `${day} ${month}, ${year}`;
};

export const to12Hour = (time24: string) => {
  if (!time24) return time24;

  const [hourStr, minute] = time24.split(':');
  const hour = parseInt(hourStr, 10);

  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${suffix}`;
};
