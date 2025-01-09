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
    paddingVertical: Layout.space.base/2,
    paddingHorizontal: Layout.space.base/1.2,
    alignSelf: 'flex-start',
  },
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default TagView;
