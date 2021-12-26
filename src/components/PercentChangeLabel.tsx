import React from 'react';
import { Icon, ITextProps, Row, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import { formatter } from '~utils/helpers';

type Props = ITextProps & {
  children?: React.ReactText;
  options?: Intl.NumberFormatOptions;
};

function PercentChangeLabel({ children, options, ...rest }: Props) {
  const percentChange = Number(children);
  const color = percentChange < 0 ? 'red.600' : 'green.700';
  return (
    <Row alignItems="center">
      <Icon
        as={Feather}
        name={percentChange < 0 ? 'arrow-down' : 'arrow-up'}
        size={4}
        color={color}
      />
      <Text color={color} {...rest}>
        {formatter.formatPercent(percentChange, options)}
      </Text>
    </Row>
  );
}

export default PercentChangeLabel;
