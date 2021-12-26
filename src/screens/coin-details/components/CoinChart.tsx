import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Row,
  Spinner,
  Text,
  useColorModeValue,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import { useSharedValue } from 'react-native-reanimated';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  Point,
} from '@rainbow-me/animated-charts';

import PercentChangeLabel from '~components/PercentChangeLabel';
import { getCoinImgUrl } from '~utils/helpers';

type Props = {
  points: Point[];
  vibrantColor: string;
  isLoading: boolean;
  percent_change_24h: string;
  nameid: string;
  price_usd: string;
  name: string;
};

const { width: SIZE } = Dimensions.get('window');

const CoinChart = ({
  points,
  price_usd,
  percent_change_24h,
  nameid,
  name,
  vibrantColor,
  isLoading,
}: Props) => {
  const strokeWidth = Math.max(StyleSheet.hairlineWidth, 3);
  const latestCurrentPrice = useSharedValue(Number(price_usd || 0));
  const priceLabelColor = useColorModeValue('black', 'lightgrey');

  useEffect(() => {
    if (price_usd) {
      latestCurrentPrice.value = Number(price_usd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price_usd]);

  const formatPrice = (value: string | number) => {
    'worklet';
    const price = Number(value || latestCurrentPrice.value);
    return Number(
      latestCurrentPrice.value > 10 ? price.toFixed(2) : price,
    ).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  return (
    <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
      <Box px="4">
        <Row justifyContent="space-between" alignItems="center">
          <HStack space={2} alignItems="center" mb="1">
            <FastImage
              style={[
                styles.logo,
                { backgroundColor: useColorModeValue(undefined, 'lightgrey') },
              ]}
              source={{
                uri: getCoinImgUrl(nameid),
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Heading size="md">{name}</Heading>
          </HStack>
          <Text fontSize="md">24h</Text>
        </Row>
        <Row justifyContent="space-between" alignItems="center">
          <ChartYLabel
            format={formatPrice}
            style={[
              styles.priceLabel,
              {
                color: priceLabelColor,
              },
            ]}
          />
          <PercentChangeLabel>{percent_change_24h}</PercentChangeLabel>
        </Row>
      </Box>
      <Box>
        <ChartPath
          strokeWidth={strokeWidth}
          height={SIZE / 2}
          stroke={vibrantColor}
          selectedStrokeWidth={strokeWidth - 1}
          width={SIZE}
        />
        <ChartDot style={{ backgroundColor: vibrantColor }} size={10} />
        {isLoading && (
          <Box
            flex={1}
            position={'absolute'}
            top={0}
            bottom={0}
            left={0}
            right={0}
            justifyContent="center"
            alignItems={'center'}
          >
            <Spinner />
          </Box>
        )}
      </Box>
      <Divider style={styles.divider} />
    </ChartPathProvider>
  );
};

export default React.memo(CoinChart);

const styles = StyleSheet.create({
  logo: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  priceLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  divider: {
    marginTop: -8,
  },
});
