import axios from 'axios';

import config from '~config';
import { handleApiError, handleApiSuccess } from '~utils/helpers';

import type {
  AllCoinsParams,
  AllCoinsResponse,
  CoinDetailsResponse,
  GlobalCryptoDataResponse,
} from './types';

export const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getGlobalCyrptoData = async () => {
  try {
    const response = await api.get<GlobalCryptoDataResponse>('/global/');
    return handleApiSuccess(response.data[0]);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllCoins = async ({ limit, start }: AllCoinsParams) => {
  try {
    const response = await api.get<AllCoinsResponse>('/tickers/', {
      params: {
        limit,
        start,
      },
    });
    const {
      data: { data, info },
    } = response;
    return handleApiSuccess({
      coins: data,
      numCoins: info.coins_num,
      time: info.time,
    });
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCoinDetails = async (coin: string) => {
  try {
    const response = await api.get<CoinDetailsResponse>('/tickers/', {
      params: {
        id: coin,
      },
    });
    return handleApiSuccess(response.data[0]);
  } catch (error) {
    return handleApiError(error);
  }
};
