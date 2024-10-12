import { StyleSheet, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  content: string,
  fontSize?: number,
  textTransform?: boolean,
  textDecoration?: boolean,
};

export function TextBlock({content, fontSize, textTransform, textDecoration}: Props) {
  return (
    <Text style={styles.text}>{content}</Text>   
  );
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
});

export default TextBlock;