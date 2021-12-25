import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useAppDispatch } from '~store/hooks';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

import CryptoList from './components/CryptoList';
import Header from './components/Header';

function HomeScreen() {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllCoins({ limit: 'all', start: 0 }));
    }, [dispatch]),
  );

  return (
    <>
      <Header />
      <CryptoList />
    </>
  );
}

export default React.memo(HomeScreen);
