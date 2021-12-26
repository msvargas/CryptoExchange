import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiService from '~services/Api.service';

import type { CoinsData } from '~services/types';
import type { RootState } from '~store';

export const fetchAllCoins = createAsyncThunk(
  'coins/fetchAllCoins',
  async (
    params: Partial<{ limit: 'all' | number; start: number }> | void,
    { getState },
  ) => {
    const state = getState() as RootState;
    const { start, ids } = state.coins;
    const isValidQueryAll = params?.limit === 'all' && ids.length > 0;

    const result = await Promise.all(
      [...new Array(isValidQueryAll ? ids.length / 100 : 1)].map((_, i) =>
        ApiService.getAllCoins({
          limit: 100,
          start: isValidQueryAll ? i * 100 : start,
        }),
      ),
    ).then(results =>
      results.reduce(
        (acc, cur) => {
          if (cur.success) {
            acc.success = true;
            acc.data.coins = acc.data.coins.concat(cur.data.coins);
            acc.data.numCoins = cur.data.numCoins;
            acc.data.time = cur.data.time;
          }
          return acc;
        },
        {
          success: false,
          data: {
            coins: [] as CoinsData[],
            numCoins: 0,
            time: 0,
          },
        },
      ),
    );
    return result;
  },
  {
    condition: (_, { getState }) => {
      const { coins } = getState() as RootState;
      if (coins.status === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
    },
  },
);

export const fetchCoinDetails = createAsyncThunk(
  'coins/fetchCoinDetails',
  async (coinId: string) => {
    const result = await ApiService.getCoinDetails(coinId);
    return result;
  },
);
