import React from 'react';
import { Dimensions } from 'react-native';
import { Box } from 'native-base';
import ImageColors from 'react-native-image-colors';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';

import { getCoinChart } from '~services/Api.service';
import { useAppSelector } from '~store/hooks';
import { selectCoinById } from '~store/slices/coins.slice';
import { getCoinImgUrl } from '~utils/helpers';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~navigation/types';

type CoinDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CoinDetails'
>;

const { width: SIZE } = Dimensions.get('window');

const BasicExample = ({ route }: CoinDetailsNavigationProp) => {
  const [points, setPoints] = React.useState([]);
  const [stroke, setStroke] = React.useState('#fff');
  const coin = useAppSelector(state =>
    selectCoinById(state, route.params.coinId),
  );

  React.useEffect(() => {
    if (!coin) {
      return;
    }
    let strokeColor: string | undefined;
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
        setStroke(strokeColor || '#000');
      });
    getCoinChart(coin.id).then(result => {
      if (result.success) {
        const data = result.data.price;
        setPoints(monotoneCubicInterpolation({ data, range: 40 }));
      }
    });
  }, [coin]);

  return (
    <Box bg="muted.100" safeArea>
      <Box>
        <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
          <ChartPath height={SIZE / 2} stroke={stroke} width={SIZE} />
          <ChartDot style={{ backgroundColor: stroke }} />
        </ChartPathProvider>
      </Box>
    </Box>
  );
};

export default BasicExample;
