import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
  style?: object,
  children?: ReactNode,
  onPress: () => void,
};

const LinkView = ({onPress, style, children}: Props) => {
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
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Colors.primary,
  },
});

export default LinkView;
