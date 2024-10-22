import { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  direction?: string,
  align?: string,
  justify?: string,
  scroll?: boolean,
  style?: object,
  children?: ReactNode,
};

const BoxView = ({direction, align, justify, scroll, style, children}: Props) => {
  const containerStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
  };

  if (scroll === true) {
    return (
      <ScrollView nestedScrollEnabled={true}>
        <Pressable>
          <View style={[styles.container, containerStyle, style]}>
            {children}
          </View>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, containerStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
});

export default BoxView;