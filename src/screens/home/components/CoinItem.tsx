import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Row, Text, useColorModeValue } from 'native-base';
import FastImage from 'react-native-fast-image';

import { getCoinImgUrl } from '~utils/helpers';

import type { CoinsData } from '~services/types';

type Props = CoinsData;

const CoinItem = ({
  name,
  nameid,
  symbol,
  price_usd,
  percent_change_24h,
}: Props) => (
  <Row
    justifyContent="space-evenly"
    alignItems="center"
    py="2"
    px="6"
    height={60}
  >
    <FastImage
      style={[
        styles.coinImg,
        { backgroundColor: useColorModeValue(undefined, 'lightgrey') },
      ]}
      source={{
        uri: getCoinImgUrl(nameid),
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
    <Box flexGrow={1} flexShrink={1} px="5" justifyContent="center">
      <Text flexShrink={1} numberOfLines={1} fontSize="md" adjustsFontSizeToFit>
        {name}
      </Text>
      <Text fontSize="xs" color="gray.500">
        {symbol}
      </Text>
    </Box>
    <Box alignItems="flex-end" justifyContent="center">
      <Text bold>
        {Number(price_usd).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 6,
        })}
      </Text>
      <Text
        color={percent_change_24h.startsWith('-') ? 'red.600' : 'green.700'}
      >
        {Number(parseFloat(percent_change_24h) / 100).toLocaleString('en-US', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    </Box>
  </Row>
);

export default React.memo(
  CoinItem,
  (prevProps, nextProps) =>
    prevProps.price_usd === nextProps.price_usd &&
    prevProps.percent_change_24h === nextProps.percent_change_24h,
);

const styles = StyleSheet.create({
  coinImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
