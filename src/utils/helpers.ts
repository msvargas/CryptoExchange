import type { AxiosError } from 'axios';

// this function is ussed to handle errors from axios
export const handleApiError = (error: unknown) => ({
  success: false as const,
  error: error as AxiosError,
});

// this function is used to handle successful responses from axios
export const handleApiSuccess = <T = unknown>(data: T) => ({
  success: true as const,
  data,
});

// get image url from coin id
export const getCoinImgUrl = (nameid: string, small?: boolean) =>
  `https://www.coinlore.com/img/${small ? '25x25/' : ''}${nameid}.png`;

export { default as formatter } from './formatter';
