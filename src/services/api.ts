import type {
  Coordinates,
  LoginUserBody,
  SendRequestBody,
  TQueryParams,
  UpdateRequestBody,
} from '@/lib/types';
import {
  getUser,
  handleApiError,
  handleLogout,
  handleThrowError,
} from '@/lib/utils';
import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL;

const publicApiClient = axios.create({
  baseURL: GATEWAY_BASE_URL,
});
const privateApiClient = axios.create({
  baseURL: GATEWAY_BASE_URL,
});

privateApiClient.interceptors.request.use(
  (config) => {
    const user = getUser();
    const token = user?.token;

    if (token) config.headers.Authorization = token;

    return config;
  },
  (error) => Promise.reject(error),
);

privateApiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    const isUnauthorized =
      status === 401 ||
      message?.includes?.('Forbidden') ||
      message?.includes?.('Unauthorized');

    if (isUnauthorized) handleLogout('Session expired. Please login again.');

    return Promise.reject(error);
  },
);

// USER SERVICE
export const loginUser = async (bodyData: LoginUserBody) => {
  try {
    const response = await publicApiClient.post('/auth/login', bodyData);
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await publicApiClient.post(
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
    const response = await publicApiClient.post(
      `/auth/reset-password?data=${encodeURIComponent(data)}`,
      {
        password,
      },
    );
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

// REQUESTS SERVICE
export const getRequests = async ({
  page,
  filters,
}: {
  page: QueryFunctionContext;
  filters: TQueryParams;
}) => {
  try {
    const response = await privateApiClient.get('/request/visit-requests', {
      params: {
        page: page.pageParam,
        limit: 4,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const getRequestById = async (id: string) => {
  try {
    const response = await privateApiClient.get(`/request/visit-request/${id}`);
    return response.data;
  } catch (error) {
    handleApiError({ error });
  }
};

export const getCoordinatesFromAddress = async (
  address: string,
): Promise<Coordinates | null> => {
  if (!GOOGLE_MAPS_API_KEY) {
    handleApiError({ error: 'Google Maps API key is missing' });
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `${GOOGLE_MAPS_BASE_URL}/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(url);

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      handleApiError({ error: 'No hosts found for the provided address.' });
      return null;
    }
  } catch (error) {
    handleApiError({ error });
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

export const sendRequest = async (body: SendRequestBody) => {
  try {
    const response = await privateApiClient.post('/request/send-request', body);
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const updateRequest = async ({
  id,
  body,
}: {
  id: string;
  body: UpdateRequestBody;
}) => {
  try {
    const response = await privateApiClient.patch(
      `/request/visit-request/${id}`,
      body,
    );
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const cancelRequest = async (id: string) => {
  try {
    const response = await privateApiClient.post(
      `/request/cancel-visit-request/${id}`,
    );
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

// VISITS SERVICE
export const getVisits = async ({
  page,
  filters,
}: {
  page: QueryFunctionContext;
  filters: TQueryParams;
}) => {
  try {
    const response = await privateApiClient.get(
      '/request/scheduled-visit-requests',
      {
        params: {
          page: page.pageParam,
          limit: 4,
          ...filters,
        },
      },
    );
    return response.data;
  } catch (error) {
    handleThrowError({ error });
  }
};

export const getVisitById = async (id: string) => {
  try {
    const response = await privateApiClient.get(
      `/request/scheduled-visit-request/${id}`,
    );
    return response.data;
  } catch (error) {
    handleApiError({ error });
  }
};
