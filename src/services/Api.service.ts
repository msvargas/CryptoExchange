import axios from 'axios';

import config from '~config';
import { handleApiError, handleApiSuccess } from '~utils/helpers';

import type {
  AllCoinsParams,
  AllCoinsResponse,
  CoinChartResponse,
  CoinDetailsResponse,
  GlobalCryptoDataResponse,
} from './types';

type ChartKeysResponse = keyof CoinChartResponse;

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

export const getCoinChart = async (coinId: string) => {
  try {
    const response = await axios.get<CoinChartResponse>(
      `${config.chartBaseUrl}?coin=${coinId}&s=undefined&e=undefined`,
    );
    const data: Record<ChartKeysResponse, Array<{ x: number; y: number }>> = {
      price: [],
      price_btc: [],
      mcap: [],
      volume: [],
    };

    for (const key in response.data) {
      if (Object.prototype.hasOwnProperty.call(response.data, key)) {
        data[key as ChartKeysResponse] = response.data[
          key as ChartKeysResponse
        ].flatMap(([x, y]) => ({ x, y }));
      }
    }
    return handleApiSuccess(data);
  } catch (error) {
    return handleApiError(error);
  }
};
