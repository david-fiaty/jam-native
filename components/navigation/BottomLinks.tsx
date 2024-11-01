import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const BottomLinks = () => {
  const router = useRouter();
  const route = useRoute();

  console.log(route.name);

  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>

      <TouchableOpacity onPress={() => route.name == 'legal' ? router.replace('/about') : router.push('/about')}>
        <TextView>{i18n.t('About')}</TextView>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => route.name == 'about' ? router.replace('/legal') : router.push('/legal')}>
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