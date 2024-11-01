import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const BottomLinks = () => {
  const router = useRouter();

  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>

      <TouchableOpacity onPress={() => router.push('/about')}>
        <TextView>{i18n.t('About')}</TextView>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/legal')}>
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