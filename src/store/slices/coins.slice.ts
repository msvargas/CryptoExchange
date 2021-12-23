import {
  createDraftSafeSelector,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { CoinsData } from '~services/types';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

import type { RootState } from '../store';

const coinsAdapter = createEntityAdapter<CoinsData>();

export const coinsSlice = createSlice({
  name: 'coins',
  initialState: coinsAdapter.getInitialState({
    status: undefined as string | undefined,
    numCoins: 0,
    time: 0,
    start: 0,
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllCoins.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllCoins.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.success) {
        state.numCoins = response.data.numCoins;
        state.time = response.data.time;
        coinsAdapter.upsertMany(state, response.data.coins);
      }
      state.status = 'idle';
    });
  },
});

export const {} = coinsSlice.actions;
export const { selectAll: selectAllCoins, selectById: selectCoinById } =
  coinsAdapter.getSelectors((state: RootState) => state.coins);

export const selectCoinsStatus = (state: RootState) => state.coins.status;
export const selectNumCoins = (state: RootState) => state.coins.numCoins;
export const selectCoinsTime = (state: RootState) => state.coins.time;

export const selectIsUnitializedCoins = createDraftSafeSelector(
  selectCoinsStatus,
  status => status === undefined,
);
export const selectIsLoadingCoins = createDraftSafeSelector(
  selectCoinsStatus,
  status => status === 'loading',
);
export const selectIsIdleCoins = createDraftSafeSelector(
  selectCoinsStatus,
  status => status === 'idle',
);

export default coinsSlice.reducer;
