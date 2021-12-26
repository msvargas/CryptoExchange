import React from 'react';
import { Divider, HStack, Text, VStack } from 'native-base';

import { formatCurrency } from '~utils/helpers';

import type { CoinState } from '~store/slices/coins.slice';

type Props = {
  coin: CoinState;
};

const CoinBasicDetails = ({ coin }: Props) => (
  <VStack space={3} divider={<Divider />} mx="3" mt="5">
    <HStack justifyContent="space-between" alignItems="flex-start">
      <VStack>
        <Text bold>Market Cap</Text>
        <Text color="gray.500">{formatCurrency(coin.market_cap_usd)}</Text>
      </VStack>
      <VStack alignItems="flex-end">
        <Text bold>24h Volume</Text>
        <Text color="gray.500" textAlign="right">
          {formatCurrency(coin.volume24)}
          {'\n'}{' '}
          <Text fontSize="xs">
            {Number(coin.volume24_native).toLocaleString('en-US', {
              style: 'decimal',
              maximumFractionDigits: 0,
            })}{' '}
            {coin.symbol}'s
          </Text>
        </Text>
      </VStack>
    </HStack>
    <HStack justifyContent="space-between">
      <VStack>
        <Text bold>Circulating Supply</Text>
        <Text color="gray.500">
          {Number(coin.csupply).toLocaleString('en-US', {
            style: 'decimal',
          })}{' '}
          {coin.symbol}
        </Text>
      </VStack>
      <VStack alignItems="flex-end">
        <Text bold>Total Supply</Text>
        <Text color="gray.500" textAlign="right">
          {Number(coin.tsupply).toLocaleString('en-US', {
            style: 'decimal',
          })}
          {'\n'}{' '}
          <Text fontSize="xs">
            MAX:
            {Number(coin.msupply).toLocaleString('en-US', {
              style: 'decimal',
              maximumFractionDigits: 0,
            })}
          </Text>
        </Text>
      </VStack>
    </HStack>
  </VStack>
);

export default CoinBasicDetails;
