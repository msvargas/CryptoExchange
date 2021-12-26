import React from 'react';
import {
  Box,
  ScrollView,
  useColorModeValue,
  useContrastText,
} from 'native-base';
import ImageColors from 'react-native-image-colors';
import {
  monotoneCubicInterpolation as interpolator,
  Point,
} from '@rainbow-me/animated-charts';
import color from 'color';

import { getCoinChart } from '~services/Api.service';
import { useAppDispatch, useAppSelector } from '~store/hooks';
import { selectCoinById } from '~store/slices/coins.slice';
import { fetchCoinDetails } from '~store/thunks/crypto.thunk';
import { getCoinImgUrl } from '~utils/helpers';

import CryptoBasicDetails from './components/CoinBasicDetails';
import CryptoChart from './components/CoinChart';
import Header from './components/Header';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~navigation/types';

type CoinDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CoinDetails'
>;

const CoinDetailsScreen = ({
  route: {
    params: { coinId },
  },
  navigation,
}: CoinDetailsNavigationProp) => {
  const [points, setPoints] = React.useState<Point[]>([]);
  const initialVibrantColor = useColorModeValue('#000000', '#D3D3D3');
  const [vibrantColor, setVibrantColor] = React.useState(initialVibrantColor);
  const contranstVibrantColor = useContrastText(initialVibrantColor);
  const [isLoading, setIsLoading] = React.useState(true);
  const coin = useAppSelector(state => selectCoinById(state, coinId));
  const dispatch = useAppDispatch();

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
          if (strokeColor === contranstVibrantColor) {
            strokeColor = initialVibrantColor;
          }
          let coinPrimaryColor = color(strokeColor || initialVibrantColor);
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

  if (!coin) {
    navigation.goBack();
    return null;
  }

  return (
    <Box flex={1} safeArea>
      <Header
        symbol={coin.symbol}
        rank={coin.rank}
        vibrantColor={vibrantColor}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CryptoChart
          name={coin.name}
          nameid={coin.nameid}
          percent_change_24h={coin.percent_change_24h}
          price_usd={coin.price_usd}
          vibrantColor={vibrantColor}
          isLoading={isLoading}
          points={points}
        />
        <CryptoBasicDetails coin={coin} />
      </ScrollView>
    </Box>
  );
};

export default CoinDetailsScreen;
