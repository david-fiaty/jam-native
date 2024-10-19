import { ReactNode } from 'react';
import { Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  style?: object,
  children?: ReactNode,
};

export default ({style, children}: Props) => {
  return (
    <Text style={[GlobalStyles.text, style]}>{children}</Text>   
  );
};
