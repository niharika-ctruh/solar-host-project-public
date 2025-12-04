import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getRequestById,
  getRequests,
  sendRequest,
  cancelRequest,
  updateRequest,
} from '../api';
import { SendRequestBody, TQueryParams, UpdateRequestBody } from '@/lib/types';
import useQueryParams from '@/hooks/useQueryParams';
import { useParams } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';

export const useGetRequests = () => {
  const { queryParams } = useQueryParams();
  const debouncedNameQuery = useDebounce(queryParams.name, 500);

  const filters: TQueryParams = {
    name: debouncedNameQuery,
    date: queryParams.date,
    status: queryParams.status,
  };

  return useInfiniteQuery({
    queryKey: ['get-requests', filters],
    queryFn: (page) => getRequests({ page, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length + 1 : undefined,
  });
};

export const useGetRequestById = () => {
  const { id } = useParams() as { id: string };

  return useQuery({
    queryKey: ['get-request-by-id', id],
    queryFn: () => getRequestById(id),
    enabled: !!id && id.length === 24,
  });
};

export const useSendRequest = () => {
  return useMutation({
    mutationKey: ['send-request'],
    mutationFn: (body: SendRequestBody) => sendRequest(body),
  });
};

export const useUpdateRequest = () => {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-request', id],
    mutationFn: (body: UpdateRequestBody) => updateRequest({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-requests'] });
      queryClient.invalidateQueries({ queryKey: ['get-visits', id] });
      queryClient.invalidateQueries({ queryKey: ['get-visit-by-id', id] });
    },
  });
};

export const useCancelRequest = () => {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cancel-request', id],
    mutationFn: () => cancelRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-requests'] });
      queryClient.invalidateQueries({ queryKey: ['get-visits', id] });
      queryClient.invalidateQueries({ queryKey: ['get-visit-by-id', id] });
    },
  });
};
