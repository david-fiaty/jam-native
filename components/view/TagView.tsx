import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';

type Props = BaseProps & {
  onDeleteButtonPress?: () => void;
  children?: any;
};

const TagView = ({ onDeleteButtonPress, children}: Props) => {
  return (
    <BoxView direction="row" align="start" justify="between" style={styles.container}>
      <TextView>
        {children}
      </TextView>
      <TouchableOpacity style={styles.delete} onPress={onDeleteButtonPress}>
        <IconView name="delete" theme="secondary" size={12} />
      </TouchableOpacity>
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

  },
});

export default TagView;
