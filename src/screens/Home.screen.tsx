import React from 'react';
import {
  Box,
  Divider,
  FlatList,
  Heading,
  Icon,
  IconButton,
  Image,
  Row,
  Spinner,
  Text,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import { CoinsData } from '~services/types';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import {
  selectAllCoins,
  selectIsLoadingCoins,
  selectIsUnitializedCoins,
} from '~store/slices/coins.slice';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

function HomeScreen() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectAllCoins);
  const isUnitialized = useAppSelector(selectIsUnitializedCoins);
  const isLoading = useAppSelector(selectIsLoadingCoins);
  const [refreshing, setRefreshing] = React.useState(false);

  const getAllCoins = async () => {
    try {
      await dispatch(fetchAllCoins({ start: 0, limit: 50 }));
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isUnitialized) {
      getAllCoins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box safeArea>
      <Row my="2" mx="4" justifyContent="space-between" alignItems="center">
        <Heading>Crypto Exchange</Heading>
        <IconButton icon={<Icon as={Feather} name="search" size="5" />} />
      </Row>
      <FlatList
        data={coins}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          isLoading || isUnitialized ? (
            <Box mt="8">
              <Spinner />
            </Box>
          ) : (
            <Text>No coins</Text>
          )
        }
        renderItem={({
          item: { symbol, nameid, price_usd },
        }: {
          item: CoinsData;
        }) => (
          <Row justifyContent="space-evenly" alignItems="center" py="2" px="5">
            <Image
              source={{
                uri: `https://www.coinlore.com/img/${nameid}.png`,
              }}
              style={{ width: 40, height: 40 }}
              _dark={{
                bg: 'darkBlue.100',
                borderRadius: 20,
              }}
              alt={`Logo ${symbol}`}
            />
            <Box flexGrow={0.9} px="5">
              <Text>{symbol}</Text>
            </Box>
            <Text>
              {Number(price_usd).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </Row>
        )}
        ItemSeparatorComponent={Divider}
        contentInsetAdjustmentBehavior="automatic"
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getAllCoins().then(() => setRefreshing(false));
        }}
      />
    </Box>
  );
}

export default HomeScreen;
