import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  style?: object;
  children?: ReactNode;
  onPress: () => void;
};

const LinkView = ({ onPress, style, children }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.content, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Layout.colors.primary,
  },
});

export default LinkView;
