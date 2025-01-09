import { StyleSheet, Text, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

const TagView = ({style, children}: BaseProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.content, style]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base,
    alignSelf: 'flex-start',
  },
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default TagView;
