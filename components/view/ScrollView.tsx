import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { BaseProps } from '@/constants/Types';

const ScrollBoxView = ({style, children}: BaseProps) => {
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
  container: {},
  content: {},
});

export default ScrollBoxView; 