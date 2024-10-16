import { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';

type Props = {
  style?: object,
  children?: ReactNode,
};

const ScrollContainer = ({style, children}: Props) => {
  return (
    <View>
    <ScrollView 
      style={[styles.view, style]}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.container}
    >
      <Pressable>{children}</Pressable>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: 'green',
    height: '100%',
  },
});

export default ScrollContainer;