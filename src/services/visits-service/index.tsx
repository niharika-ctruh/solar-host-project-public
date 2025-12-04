import useQueryParams from '@/hooks/useQueryParams';
import { TQueryParams } from '@/lib/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getVisitById, getVisits } from '../api';
import useDebounce from '@/hooks/useDebounce';
import { useParams } from 'next/navigation';

export const useGetVisits = () => {
  const { queryParams } = useQueryParams();
  const debouncedSearchQuery = useDebounce(queryParams.search, 500);

  const filters: TQueryParams = {
    tab: queryParams.tab,
    status: queryParams.status,
    search: debouncedSearchQuery,
  };

  return useInfiniteQuery({
    queryKey: ['get-visits', filters],
    queryFn: (page) => getVisits({ page, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length + 1 : undefined,
  });
};

export const useGetVisitById = () => {
  const { id } = useParams() as { id: string };

  return useQuery({
    queryKey: ['get-visit-by-id', id],
    queryFn: () => getVisitById(id),
    enabled: !!id && id.length === 24,
  });
};
