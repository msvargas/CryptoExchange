import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Box, Divider, Spinner, Text, useColorModeValue } from 'native-base';
import throttle from 'lodash/throttle';

import { useAppDispatch, useAppSelector } from '~store/hooks';
import {
  loadMoreCoins,
  selectAllCoins,
  selectIsLoadingCoins,
  selectIsUnitializedCoins,
} from '~store/slices/coins.slice';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

import CoinItem from './components/CoinItem';
import Header from './components/Header';

import type { AllCoinsParams, CoinsData } from '~services/types';

const renderCoinItem: ListRenderItem<CoinsData> = ({ item }) => (
  <CoinItem key={item.nameid} {...item} />
);

function HomeScreen() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectAllCoins);
  const isUnitialized = useAppSelector(selectIsUnitializedCoins);
  const isLoading = useAppSelector(selectIsLoadingCoins);
  const [refreshing, setRefreshing] = React.useState(false);
  const refreshControlColor = useColorModeValue(undefined, 'white');
  const windowSize = coins.length > 100 ? Math.floor(coins.length / 5) : 21;

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
    if (isUnitialized) {
      getAllCoins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.container}
        data={coins}
        ListEmptyComponent={
          !isLoading && !isUnitialized ? <Text>No coins</Text> : null
        }
        ListFooterComponent={
          isLoading && !isUnitialized && !refreshing ? (
            <Box alignItems="center" mb="8" safeAreaBottom>
              <Divider mb="2" />
              <Spinner />
              <Text>Loading...</Text>
            </Box>
          ) : null
        }
        renderItem={renderCoinItem}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.nameid}
        indicatorStyle={refreshControlColor}
        onEndReached={fetchMoreCoins}
        onEndReachedThreshold={0.5}
        initialNumToRender={21}
        maxToRenderPerBatch={windowSize}
        windowSize={windowSize}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={refreshControlColor ? [refreshControlColor] : undefined}
            tintColor={refreshControlColor}
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
