import React from 'react';
import { Box, Divider, Spinner, Text } from 'native-base';

import { useAppSelector } from '~store/hooks';
import {
  selectIsLoadingCoins,
  selectIsUnitializedCoins,
} from '~store/slices/coins.slice';

function Footer() {
  const isUnitialized = useAppSelector(selectIsUnitializedCoins);
  const isLoading = useAppSelector(selectIsLoadingCoins);

  return isLoading || isUnitialized ? (
    <Box alignItems="center" mb="8" safeAreaBottom>
      <Divider mb="2" />
      <Spinner />
      <Text>Loading...</Text>
    </Box>
  ) : null;
}

export default Footer;
