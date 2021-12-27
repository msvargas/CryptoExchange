import React from 'react';
import { Badge, Heading, Icon, IconButton, Row, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

type Props = {
  symbol: string;
  rank: number;
  vibrantColor: string;
};

const Header = ({ symbol, rank, vibrantColor }: Props) => {
  const navigation = useNavigation();

  return (
    <Row justifyContent="space-between" alignItems="center" mx="1" pb="2">
      <Row alignItems="center">
        <IconButton
          icon={<Icon as={Feather} name="arrow-left-circle" size={8} />}
          onPress={navigation.goBack}
        />
        <Heading style={{ color: vibrantColor }}>{symbol}</Heading>
      </Row>
      <Badge style={{ backgroundColor: vibrantColor }} borderRadius="md">
        <Text color="white" bold>
          Rank #{rank}
        </Text>
      </Badge>
    </Row>
  );
};

export default Header;
