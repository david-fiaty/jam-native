import { StyleSheet, Text, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';

const TagView = ({style, children}: BaseProps) => {
  return (
    <BoxView direction="horizontal" align="start" justify="between" style={styles.container}>
      <TextView>
        {children}
      </TextView>
      <View style={styles.delete}>
        <IconView name="delete" theme="secondary" size={10} />
      </View>
    </BoxView>
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
  delete: {
    position: 'absolute',
    right: 0,
  },
});

export default TagView;
