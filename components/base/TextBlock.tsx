import { Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import React, { ReactNode } from 'react';

type Props = {
  styles?: {},
  children?: ReactNode,
};

const TextBlock = ({styles, children}: Props) => {
  return (
    <Text style={[styles, GlobalStyles.text]}>{children}</Text>   
  );
};

export default TextBlock;