import { StyleSheet, Text } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';

const TextView = ({style, children}: BaseProps) => {
  return (
    <Text style={[styles.content, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    //fontFamily: 'BaseFont', // Todo - Enable font
  },
});

export default TextView;
