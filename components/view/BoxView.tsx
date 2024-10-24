import { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Touchable, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  direction?: string,
  align?: string,
  justify?: string,
  scroll?: boolean,
  onPress?: () => void,
  style?: object,
  children?: ReactNode,
};

const BoxView = ({direction, align, justify, scroll, onPress, style, children}: Props) => {
  const containerStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
  };

  let output = (
    <View style={[styles.container, containerStyle, style]}>
      {children}
    </View>
  );

  if (scroll) {
    output = (
      <ScrollView nestedScrollEnabled={true}>
        <Pressable>{output}</Pressable>
      </ScrollView>      
    );
  }
  else if (onPress) {
    output = (
      <TouchableOpacity onPress={onPress}>
        {output}
      </TouchableOpacity>
    );
  }

  return output;
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
});

export default BoxView;