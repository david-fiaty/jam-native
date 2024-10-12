import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';

type Props = {
  content: string,
  uppercase?: boolean,
  underline?: boolean,
};

export function TextBlock({content, uppercase, underline}: Props) {
  return (
    <Text style={styles.text}>{content}</Text>   
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.primary,
    fontSize: 13.5,
  },
});

export default TextBlock;