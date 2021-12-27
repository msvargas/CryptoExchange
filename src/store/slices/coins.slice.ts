import {
  createDraftSafeSelector,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import deburr from 'lodash/deburr';

import { fetchAllCoins, fetchCoinDetails } from '~store/thunks/crypto.thunk';

import type { CoinDetails, CoinsData } from '~services/types';
import type { RootState } from '../store';

export type CoinState = CoinsData & Partial<CoinDetails>;

const coinsAdapter = createEntityAdapter<CoinState>();

export const coinsSlice = createSlice({
  name: 'coins',
  initialState: coinsAdapter.getInitialState({
    status: undefined as string | undefined,
    numCoins: 0,
    time: 0,
    start: 0,
    search: '',
  }),
  reducers: {
    loadMoreCoins: state => {
      // increment start variable to load more coins
      if (
        state.status === 'idle' &&
        state.start + state.ids.length <= state.numCoins
      ) {
        state.start += state.ids.length;
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      // update search variable to filter coins
      state.search = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllCoins.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllCoins.fulfilled, (state, action) => {
        const response = action.payload;
        if (response.success) {
          state.numCoins = response.data.numCoins;
          state.time = response.data.time;
          coinsAdapter.upsertMany(state, response.data.coins as CoinState[]);
        }
        state.status = 'idle';
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        const response = action.payload;
        if (response.success) {
          coinsAdapter.updateOne(state, {
            id: response.data.id,
            changes: response.data as CoinState,
          });
        }
      });
  },
});

export const { loadMoreCoins, setSearch } = coinsSlice.actions;
export const { selectAll: selectAllCoins, selectById: selectCoinById } =
  coinsAdapter.getSelectors((state: RootState) => state.coins);

export const selectSearch = (state: RootState) => state.coins.search;
export const selectCoinList = createSelector(
  [selectAllCoins, selectSearch],
  (coins, search) => {
    if (!search) {
      return coins;
    }
    const searchDeburr = deburr(search.toLowerCase());
    return coins.filter(
      coin =>
        coin.name.toLowerCase().includes(searchDeburr) ||
        coin.symbol.toLocaleLowerCase().includes(searchDeburr),
    );
  },
);
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
