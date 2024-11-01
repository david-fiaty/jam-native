import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const BottomLinks = () => {
  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>

    <TouchableOpacity onPress={() => {}}>
      <TextView>{i18n.t('About')}</TextView>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {}}>
      <TextView>{i18n.t('Legal')}</TextView>
    </TouchableOpacity>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: Layout.space.base*2,
  },
});

export default BottomLinks;