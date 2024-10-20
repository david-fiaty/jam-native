import { StyleSheet, Text } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';

export default ({style, children}: BaseProps) => {
  return (
    <Text style={[styles.content, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontFamily: 'BaseFont',
  },
});

