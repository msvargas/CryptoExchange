import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { Divider, useColorModeValue } from 'native-base';
import { useDrawerStatus } from '@react-navigation/drawer';
import throttle from 'lodash/throttle';

import RefreshControlColorMode from '~components/RefreshControlColorMode';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import { loadMoreCoins, selectCoinList } from '~store/slices/coins.slice';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

import CoinItem from './CoinItem';
import Footer from './Footer';

import type { CoinsData } from '~services/types';

const renderCoinItem: ListRenderItem<CoinsData> = ({ item }) => (
  <CoinItem key={item.nameid} {...item} />
);

function CryptoList() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoinList);
  const [refreshing, setRefreshing] = React.useState(false);
  const isDrawerOpen = useDrawerStatus() === 'open';
  const indicatorStyle = useColorModeValue(undefined, 'white');

  const windowSize = coins.length > 100 ? Math.floor(coins.length / 6) : 21;

  const getAllCoins = useCallback(
    async (params?: { start?: number; limit?: 'all' | number }) => {
      try {
        await dispatch(fetchAllCoins(params));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMoreCoins = useCallback(
    throttle(async () => {
      try {
        // increment start variable to load more coins
        dispatch(loadMoreCoins());
        await getAllCoins();
      } catch (error) {
        console.error(error);
      }
    }, 1000),
    [dispatch, getAllCoins],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllCoins({ start: 0, limit: 'all' });
    setRefreshing(false);
  }, [getAllCoins]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.container}
      data={coins}
      renderItem={renderCoinItem}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={Footer}
      indicatorStyle={indicatorStyle}
      onEndReached={fetchMoreCoins}
      onEndReachedThreshold={0.5}
      initialNumToRender={15}
      maxToRenderPerBatch={isDrawerOpen ? 10 : windowSize}
      windowSize={isDrawerOpen ? 21 : windowSize}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControlColorMode
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    />
  );
}

export default React.memo(CryptoList);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});
