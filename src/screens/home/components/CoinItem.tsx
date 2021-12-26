import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Row, Text, useColorModeValue } from 'native-base';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import PercentChangeLabel from '~components/PercentChangeLabel';
import { formatCurrency, getCoinImgUrl } from '~utils/helpers';

import type { CoinsData } from '~services/types';

type Props = CoinsData;

const CoinItem = ({
  id,
  name,
  nameid,
  symbol,
  price_usd,
  percent_change_24h,
}: Props) => {
  const navigation = useNavigation();
  const percentChange = Number(percent_change_24h);
  const handlePress = () => {
    navigation.navigate('CoinDetails', { coinId: id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Row
        justifyContent="space-evenly"
        alignItems="center"
        py="2"
        px="6"
        height={60}
        pointerEvents="none"
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
          <Text
            flexShrink={1}
            numberOfLines={1}
            fontSize="md"
            adjustsFontSizeToFit
          >
            {name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {symbol}
          </Text>
        </Box>
        <Box alignItems="flex-end" justifyContent="center">
          <Text bold>{formatCurrency(price_usd)}</Text>
          <PercentChangeLabel>{percentChange}</PercentChangeLabel>
        </Box>
      </Row>
    </TouchableOpacity>
  );
};

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
