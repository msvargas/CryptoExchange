import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { Divider, useColorModeValue } from 'native-base';
import { useDrawerStatus } from '@react-navigation/drawer';
import throttle from 'lodash/throttle';

import RefreshControlColorMode from '~components/RefreshControlColorMode';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import { loadMoreCoins, selectAllCoins } from '~store/slices/coins.slice';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

import CoinItem from './components/CoinItem';
import Footer from './components/Footer';
import Header from './components/Header';

import type { AllCoinsParams, CoinsData } from '~services/types';

const renderCoinItem: ListRenderItem<CoinsData> = ({ item }) => (
  <CoinItem key={item.nameid} {...item} />
);

function HomeScreen() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectAllCoins);
  const [refreshing, setRefreshing] = React.useState(false);
  const isDrawerOpen = useDrawerStatus() === 'open';
  const indicatorStyle = useColorModeValue(undefined, 'white');

  const windowSize = coins.length > 100 ? Math.floor(coins.length / 6) : 21;

  const getAllCoins = useCallback(
    async (params?: AllCoinsParams) => {
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
    await getAllCoins({ start: 0, limit: coins.length });
    setRefreshing(false);
  }, [getAllCoins, coins.length]);

  React.useEffect(() => {
    getAllCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
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
    </>
  );
}

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});
