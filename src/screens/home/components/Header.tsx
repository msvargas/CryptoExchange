import React, { useCallback, useRef } from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import { Box, Heading, Icon, IconButton, Row } from 'native-base';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import SearchBar from '~components/SearchBar';
import { useAppDispatch } from '~store/hooks';
import { setSearch } from '~store/slices/coins.slice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function Header() {
  const searchInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const dispatch = useAppDispatch();
  const offset = useSharedValue(0);

  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);
  const handlePressSearchButton = useCallback(() => {
    searchInputRef.current?.focus();
    offset.value = withTiming(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeText = (text: string) => dispatch(setSearch(text.trim()));
  const handleBlur = () => {
    offset.value = withTiming(0);
    dispatch(setSearch(''));
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: (1 - offset.value) * SCREEN_WIDTH }],
    };
  });

  return (
    <Box>
      <Row
        py="2"
        px="4"
        justifyContent="space-between"
        alignItems="center"
        borderBottomColor="gray.200"
        borderBottomWidth={1}
        _dark={{
          backgroundColor: 'muted.800',
        }}
        safeAreaTop
      >
        <IconButton
          onPress={handlePressMenuButton}
          borderRadius={100}
          _icon={{
            as: Feather,
            name: 'menu',
            size: 6,
          }}
        />
        <Heading>Crypto Price</Heading>
        <IconButton
          icon={<Icon as={Feather} name="search" size="5" />}
          onPress={handlePressSearchButton}
        />
      </Row>
      <Animated.View
        style={[StyleSheet.absoluteFill, animatedStyles]}
        pointerEvents="box-none"
      >
        <Box
          justifyContent="center"
          alignItems="center"
          pointerEvents="box-none"
          bg="white"
          height="100%"
          _dark={{
            backgroundColor: 'muted.800',
          }}
          safeAreaTop
        >
          <SearchBar
            ref={searchInputRef}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
          />
        </Box>
      </Animated.View>
    </Box>
  );
}

export default Header;
