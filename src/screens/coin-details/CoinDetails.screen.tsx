import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Row,
  ScrollView,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import ImageColors from 'react-native-image-colors';
import { useSharedValue } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  monotoneCubicInterpolation as interpolator,
  Point,
} from '@rainbow-me/animated-charts';
import color from 'color';

import { getCoinChart } from '~services/Api.service';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import { selectCoinById } from '~store/slices/coins.slice';
import { fetchCoinDetails } from '~store/thunks/crypto.thunk';
import { getCoinImgUrl } from '~utils/helpers';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~navigation/types';

type CoinDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CoinDetails'
>;

const { width: SIZE } = Dimensions.get('window');

const BasicExample = ({
  route: {
    params: { coinId },
  },
  navigation,
}: CoinDetailsNavigationProp) => {
  const [points, setPoints] = React.useState<Point[]>([]);
  const [vibrantColor, setVibrantColor] = React.useState('#fff');
  const [isLoading, setIsLoading] = React.useState(true);
  const coin = useAppSelector(state => selectCoinById(state, coinId));
  const dispatch = useAppDispatch();
  const strokeWidth = Math.max(StyleSheet.hairlineWidth, 3);
  const latestCurrentPrice = useSharedValue(Number(coin?.price_usd || 0));
  const bgColorImg = useColorModeValue(undefined, 'lightgrey');

  React.useEffect(() => {
    if (!coinId || !coin) {
      return;
    }
    let strokeColor: string | undefined;
    Promise.all([
      ImageColors.getColors(getCoinImgUrl(coin.nameid, true), {
        key: coin.nameid,
        cache: true,
        fallback: '#000',
      })
        .then(colors => {
          switch (colors.platform) {
            case 'ios':
              if (colors.primary !== '#FFFFFF') {
                strokeColor = colors.primary;
              } else {
                strokeColor = colors.secondary;
              }
              break;
            case 'android':
              strokeColor = colors.vibrant;

              break;
          }
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          if (strokeColor === '#FFFFFF') {
            strokeColor = '#000';
          }
          let coinPrimaryColor = color(strokeColor || '#000');
          if (coinPrimaryColor.isLight()) {
            coinPrimaryColor = coinPrimaryColor.darken(0.2);
          }
          setVibrantColor(coinPrimaryColor.hex());
        }),
      dispatch(fetchCoinDetails(coinId)).unwrap(),
      getCoinChart(coinId).then(result => {
        if (result.success) {
          const data = result.data.price;
          setPoints(
            interpolator({
              data,
              range: 200,
            }),
          );
        }
        setIsLoading(false);
      }),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId]);
  useEffect(() => {
    if (coin) {
      latestCurrentPrice.value = Number(coin.price_usd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin]);

  const formatCurrency = (value: string | number) => {
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

  if (!coin) return null;

  return (
    <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
      <Box flex={1} safeArea>
        <Row justifyContent="space-between" alignItems="center" mx="1" pb="2">
          <Row alignItems="center">
            <IconButton
              icon={<Icon as={Feather} name="arrow-left-circle" size={8} />}
              onPress={navigation.goBack}
            />
            <Heading style={{ color: vibrantColor }}>{coin.symbol}</Heading>
          </Row>
          <Text color="darkBlue.600">
            <Text bold>Rank:</Text> <Text>#{coin.rank}</Text>
          </Text>
        </Row>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box px="4">
            <Row justifyContent="space-between" alignItems="center">
              <HStack space={2} alignItems="center" mb="1">
                <FastImage
                  style={[
                    { width: 25, height: 25, borderRadius: 12.5 },
                    { backgroundColor: bgColorImg },
                  ]}
                  source={{
                    uri: getCoinImgUrl(coin.nameid),
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Heading size="md">{coin.name}</Heading>
              </HStack>
              <Text fontSize="md">24h</Text>
            </Row>
            <Row justifyContent="space-between" alignItems="center">
              <ChartYLabel
                format={formatCurrency}
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginLeft: 5,
                  color: bgColorImg,
                }}
              />
              <Row alignItems="center">
                <Icon
                  as={Feather}
                  name={
                    Number(coin.percent_change_24h) < 0
                      ? 'arrow-down'
                      : 'arrow-up'
                  }
                  size={4}
                  color={
                    Number(coin.percent_change_24h) < 0
                      ? 'red.600'
                      : 'green.700'
                  }
                />
                <Text
                  color={
                    Number(coin.percent_change_24h) < 0
                      ? 'red.600'
                      : 'green.700'
                  }
                  bold
                >
                  {(Number(coin.percent_change_24h) / 100).toLocaleString(
                    'en-US',
                    {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )}
                </Text>
              </Row>
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
          <Divider style={{ marginTop: -8 }} />
          <VStack space={3} divider={<Divider />} mx="3" mt="5">
            <HStack justifyContent="space-between" alignItems="flex-start">
              <VStack>
                <Text bold>Market Cap</Text>
                <Text color="gray.500">
                  {formatCurrency(coin.market_cap_usd)}
                </Text>
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
        </ScrollView>
      </Box>
    </ChartPathProvider>
  );
};

export default BasicExample;
