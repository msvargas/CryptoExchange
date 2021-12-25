import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { Icon, IInputProps, Input } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = forwardRef<TextInput, IInputProps>((props, ref) => (
  <Input
    ref={ref}
    placeholder="Search"
    variant="filled"
    width="95%"
    py="1"
    borderRadius="10"
    h={38}
    clearButtonMode="while-editing"
    returnKeyType="done"
    InputLeftElement={
      <Icon
        as={Feather}
        name="search"
        ml="2"
        size="5"
        color="gray.500"
        _dark={{
          color: 'muted.100',
        }}
      />
    }
    {...props}
  />
));

export default SearchBar;
