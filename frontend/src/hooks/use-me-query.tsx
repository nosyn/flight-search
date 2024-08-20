import { getMe } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => {
      return getMe();
    },
  });
};
