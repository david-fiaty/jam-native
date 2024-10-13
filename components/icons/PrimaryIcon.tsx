import { Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  style?: {},
  children?: ReactNode,
};

const TextBlock = ({style, children}: Props) => {
  return (
    <Text style={[GlobalStyles.text, style]}>{children}</Text>   
  );
};

export default TextBlock;