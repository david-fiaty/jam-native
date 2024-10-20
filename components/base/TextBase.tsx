import { Text } from 'react-native';
import { Props } from '@/constants/Types';

export default ({style, children}: Props) => {
  return (
    <Text style={style}>
      {children}
    </Text>   
  );
};
