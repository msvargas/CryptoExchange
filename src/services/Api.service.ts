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

class Point {
  constructor(public x: number, public y: number) {}
}
class ApiService {
  constructor(
    public api = axios.create({
      baseURL: config.apiBaseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  ) {}

  async getAllCoins(params: AllCoinsParams) {
    try {
      const response = await this.api.get<AllCoinsResponse>('/tickers/', {
        params,
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
  }

  async getGlobalCyrptoData() {
    try {
      const response = await this.api.get<GlobalCryptoDataResponse>('/global/');
      return handleApiSuccess(response.data[0]);
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getCoinDetails(coinId: string) {
    try {
      const response = await this.api.get<CoinDetailsResponse>('/ticker/', {
        params: {
          id: coinId,
        },
      });
      return handleApiSuccess(response.data[0]);
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getCoinChart(coinId: string) {
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
          ].flatMap(([x, y]) => new Point(x, y));
        }
      }
      return handleApiSuccess(data);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

//create singleton instance
export default new ApiService();
