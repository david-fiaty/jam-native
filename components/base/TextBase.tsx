import { Text } from 'react-native';
import { BaseProps } from '@/constants/Types';

export default ({style, children}: BaseProps) => {
  return (
    <Text style={style}>
      {children}
    </Text>   
  );
};
