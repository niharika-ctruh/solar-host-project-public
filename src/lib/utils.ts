import CryptoJS from 'crypto-js';
import type { UserData } from './types';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
export const USER_LOCAL_STORAGE_KEY = 'USER_INFO';

const encryptData = (data: string): string => {
  const keyHex = CryptoJS.enc.Hex.parse(SECRET_KEY);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(data, keyHex, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return iv.toString(CryptoJS.enc.Base64) + ':' + encrypted.toString();
};

export const decryptData = (encryptedData: string) => {
  try {
    if (!encryptedData.includes(':')) return undefined;

    const [ivBase64, cipherBase64] = encryptedData.split(':');
    if (!ivBase64 || !cipherBase64) return undefined;

    const keyHex = CryptoJS.enc.Hex.parse(SECRET_KEY);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    let bytes;
    try {
      bytes = CryptoJS.AES.decrypt(cipherBase64, keyHex, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
    } catch (error) {
      return undefined;
    }

    const result = bytes.toString(CryptoJS.enc.Utf8) || undefined;
    if (!result) return undefined;

    return result;
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
  localStorage.clear();
  sessionStorage.clear();
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

// Example: "02 Dec, 2025"
export const formatShortDate = (isoDate: string) => {
  const d = new Date(isoDate);

  const day = d.toLocaleString('en-GB', { day: '2-digit' });
  const month = d.toLocaleString('en-GB', { month: 'short' });
  const year = d.toLocaleString('en-GB', { year: 'numeric' });

  return `${day} ${month}, ${year}`;
};

// Example: "Tue, 02 Dec 2025, 10:05 AM"
export const formatFullDateTime = (isoDate: string) => {
  const d = new Date(isoDate);

  const weekday = d.toLocaleString('en-US', { weekday: 'short' });
  const day = d.toLocaleString('en-US', { day: '2-digit' });
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${weekday}, ${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
};

// Example: "10:05 AM"
export const to12Hour = (time24: string) => {
  if (!time24) return time24;

  const [hourStr, minute] = time24.split(':');
  const hour = parseInt(hourStr, 10);

  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${suffix}`;
};
