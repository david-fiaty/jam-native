import { ReactNode } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';

type Props = {
  style?: object,
  children?: ReactNode,
};

const ScrollContainer = ({style, children}: Props) => {
  return (
    <ScrollView 
      style={[styles.container, style]}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.content}
    >
      <Pressable>{children}</Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
  content: {
    backgroundColor: 'blue',
  },
});

export default ScrollContainer;