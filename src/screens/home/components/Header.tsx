import React, { useCallback } from 'react';
import { Heading, Icon, IconButton, Row } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

function Header() {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
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
      <Heading>Crypto Exchange</Heading>
      <IconButton icon={<Icon as={Feather} name="search" size="5" />} />
    </Row>
  );
}

export default Header;
