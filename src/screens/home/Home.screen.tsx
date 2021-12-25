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
      dispatch(fetchAllCoins({ start: 0, limit: 'all' }));
    }, [dispatch]),
  );

  return (
    <>
      <Header />
      <CryptoList />
    </>
  );
}

export default HomeScreen;
