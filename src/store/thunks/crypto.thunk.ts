import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllCoins } from '~services/Api.service';
import { AllCoinsParams } from '~services/types';

import type { RootState } from '~store';

export const fetchAllCoins = createAsyncThunk(
  'coins/fetchAllCoins',
  async (params: Partial<AllCoinsParams> | void, { getState }) => {
    const state = getState() as RootState;
    const { start } = state.coins;
    const result = await getAllCoins({
      limit: params?.limit || 100,
      start: params?.start || start,
    });
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
