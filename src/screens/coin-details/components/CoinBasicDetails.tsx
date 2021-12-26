import React from 'react';
import { Divider, HStack, Row, Text, VStack } from 'native-base';

import InfoTooltip from '~components/InfoTooltip';
import { formatter } from '~utils/helpers';

import type { CoinState } from '~store/slices/coins.slice';

type Props = {
  coin: CoinState;
};

const CoinBasicDetails = ({ coin }: Props) => (
  <VStack space={3} divider={<Divider />} mx="3" mt="5">
    <HStack justifyContent="space-between" alignItems="flex-start">
      <VStack>
        <Row alignItems="center">
          <Text bold>Market Cap </Text>
          <InfoTooltip
            label="Market Cap is equal to the circulation supply multiplied by the price of cryptocurrency Market Cap = Circulation Coins * Current Coin Price."
            crossOffset={20}
          />
        </Row>
        <Text color="gray.500">
          {formatter.formatCurrency(coin.market_cap_usd)}
        </Text>
      </VStack>
      <VStack alignItems="flex-end">
        <Text bold>24h Volume</Text>
        <Text color="gray.500" textAlign="right">
          {formatter.formatCurrency(coin.volume24)}
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
        <Row alignItems="center">
          <Text bold>Circulating Supply </Text>
          <InfoTooltip label="Circulating supply - the number of coins or tokens that's been mined/created—the approximate number currently in public hands and circulating in the market." />
        </Row>
        <Text color="gray.500">
          {formatter.formatDecimal(coin.csupply)} {coin.symbol}
        </Text>
      </VStack>
      <VStack alignItems="flex-end">
        <Row alignItems="center">
          <Text bold>Total Supply </Text>
          <InfoTooltip label="Total supply - total number of coins that is currently in existence however not all are circulating. Max Supply - Maximum number of coins that will ever exist" />
        </Row>
        <Text color="gray.500" textAlign="right">
          {formatter.formatDecimal(coin.tsupply)}
          {'\n'}{' '}
          <Text fontSize="xs">
            MAX:{' '}
            {formatter.formatDecimal(coin.msupply, {
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
