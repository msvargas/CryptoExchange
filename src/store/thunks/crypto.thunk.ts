import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllCoins } from '~services/Api.service';
import { AllCoinsParams } from '~services/types';
import { RootState } from '~store';

export const fetchAllCoins = createAsyncThunk(
  'coins/fetchAllCoins',
  async ({ limit = 100, start }: AllCoinsParams) => {
    const result = await getAllCoins({ limit, start });
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
