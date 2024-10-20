import { Text } from 'react-native';
import Props from '@/constants/Interfaces';

export default ({style, children}: Props) => {
  return (
    <Text style={style}>
      {children}
    </Text>   
  );
};
