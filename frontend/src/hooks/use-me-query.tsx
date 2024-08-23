import { API_ME } from '@/lib/constants';
import { HttpErrorResponse } from '@/lib/react-query-client';
import { Me, MeSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';

export const useMeQuery = () => {
  return useQuery<Me, HttpErrorResponse, Me>({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await fetch(`${API_ME}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const { success, data: me } = await MeSchema.safeParseAsync(data);

        if (success) {
          return me;
        }

        throw new HttpErrorResponse('Invalid me data', response.status);
      }

      const errorMessage = (await response.text()) as string;

      throw new HttpErrorResponse(errorMessage, response.status);
    },
  });
};
