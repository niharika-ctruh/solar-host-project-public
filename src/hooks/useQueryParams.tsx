'use client';
import { TQueryParams } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParams = (): TQueryParams => {
    const params: TQueryParams = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const updateParams = ({
    remove = [],
    set = {},
  }: {
    remove?: string[];
    set?: TQueryParams;
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    // remove keys
    remove.forEach((key) => newParams.delete(key));

    // set keys
    Object.entries(set).forEach(([key, value]) => newParams.set(key, value));

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return {
    queryParams: getParams(),
    updateParams,
  };
};

export default useQueryParams;
