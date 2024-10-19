import { ReactNode } from 'react';
import { Text } from 'react-native';

type Props = {
  style?: object,
  children?: ReactNode,
};

export default ({style, children}: Props) => {
  return (
    <Text style={style}>
      {children}
    </Text>   
  );
};
