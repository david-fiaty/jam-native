import { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  direction?: string;
  align?: string;
  justify?: string;
  scroll?: boolean;
  gap?: any;
  onPress?: () => void;
  onLayout?: () => void;
  style?: object;
  children?: ReactNode;
};

const BoxView = ({direction, align, justify, scroll, gap, onPress, onLayout, style, children}: Props) => {
  const containerStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    gap: gap || Layout.space.base,
  };

  let output = (
    <View style={[containerStyle, style]} onLayout={onLayout}>
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
  scrollContainer: {
    width: '100%',
  },
});

export default BoxView;