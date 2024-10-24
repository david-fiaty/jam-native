import { StyleSheet, Text } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

const SaveJamView = ({style, children}: BaseProps) => {
  return (
    <Text style={[styles.content, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
    //fontFamily: 'BaseFont', // Todo - Enable font
  },
});

export default SaveJamView;
