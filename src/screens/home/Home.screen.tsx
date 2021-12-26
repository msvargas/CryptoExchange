import React, { useEffect } from 'react';

import { useAppDispatch } from '~store/hooks';
import { fetchAllCoins } from '~store/thunks/crypto.thunk';

import CryptoList from './components/CryptoList';
import Header from './components/Header';

function HomeScreen() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCoins({ start: 0, limit: 'all' }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <CryptoList />
    </>
  );
}

export default HomeScreen;
