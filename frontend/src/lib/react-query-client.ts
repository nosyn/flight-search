import { QueryClient } from '@tanstack/react-query';

// Create a client
export const reactQueryClient = new QueryClient();

export class HttpErrorResponse extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
