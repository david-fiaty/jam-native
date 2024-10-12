import { StyleSheet, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  content: string,
  transform?: boolean,
  underline?: boolean,
};

export function TextBlock({content, transform, underline}: Props) {
  return (
    <Text style={styles.text}>{content}</Text>   
  );
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
});

export default TextBlock;