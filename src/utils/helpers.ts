import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => ({
  success: false as const,
  error: error as AxiosError,
});

export const handleApiSuccess = <T = unknown>(data: T) => ({
  success: true as const,
  data,
});
