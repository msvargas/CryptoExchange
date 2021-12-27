import React from 'react';
import {
  Box,
  Icon,
  IconButton,
  IPopoverProps,
  Popover,
  Text,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

type Props = Partial<IPopoverProps> & { label: string };

export default function InfoTooltip({ label, ...rest }: Props) {
  return (
    <Popover
      trigger={triggerProps => (
        <IconButton
          {...triggerProps}
          icon={<Icon as={Feather} name="info" size={3} />}
          size={3}
          hitSlop={16}
        />
      )}
      {...rest}
    >
      <Popover.Content maxW="56">
        <Popover.Arrow />
        <Box p="3" borderRadius="8">
          <Text fontSize="xs">{label}</Text>
        </Box>
      </Popover.Content>
    </Popover>
  );
}
