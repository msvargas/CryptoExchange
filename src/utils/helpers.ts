import { AxiosError } from 'axios';

import config from '~config';

export const handleApiError = (error: unknown) => ({
  success: false as const,
  error: error as AxiosError,
});

export const handleApiSuccess = <T = unknown>(data: T) => ({
  success: true as const,
  data,
});

export const getCoinImgUrl = (nameid: string, small?: boolean) =>
  `https://www.coinlore.com/img/${small ? '25x25/' : ''}${nameid}.png`;

export const formatCurrency = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
) =>
  Number(value).toLocaleString(config.locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
    ...options,
  });

export const formatDecimal = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
) =>
  Number(value).toLocaleString(config.locale, {
    style: 'decimal',
    ...options,
  });

export const formatPercent = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
) =>
  (Number(value) / 100).toLocaleString(config.locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
