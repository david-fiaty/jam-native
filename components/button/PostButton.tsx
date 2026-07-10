import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';

type Props = {
  onPress: () => void,
};

const PostButton = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TextView style={styles.label}>{i18n.t('Post')}</TextView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Layout.radius.round,
    backgroundColor: Layout.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.space.base*4.3,
  },
  label: {
    color: Layout.colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default PostButton;