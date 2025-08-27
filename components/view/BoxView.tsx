import { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  direction?: string;
  align?: string;
  justify?: string;
  scroll?: boolean;
  onPress?: () => void;
  onLayout?: () => void;
  style?: object;
  children?: ReactNode;
};

const BoxView = ({direction, align, justify, scroll, onPress, onLayout, style, children}: Props) => {
  const containerStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
  };

  let output = (
    <View style={[styles.container, containerStyle, style]} onLayout={onLayout}>
      {children}
    </View>
  );

  if (scroll) {
    output = (
      <ScrollView nestedScrollEnabled={true} style={styles.scrollContainer}>
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
  scrollContainer: {
    width: '100%',
  },
});

export default BoxView;