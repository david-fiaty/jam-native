import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const BottomLinks = () => {
  const router = useRouter();
  const route = useRoute();

  let aboutLink = <TextView style={route.name == 'about' ? styles.disabled : {}}>{i18n.t('About')}</TextView>;
  let legalLink = <TextView style={route.name == 'legal' ? styles.disabled : {}}>{i18n.t('Legal')}</TextView>;

  if (route.name != 'about') {
    aboutLink = (
      <TouchableOpacity 
        onPress={() => router.push('/about')}
        //onPress={() => route.name == 'legal' ? router.replace('/about') : router.push('/about')}
      >
        {aboutLink}
      </TouchableOpacity>
    );
  }

  if (route.name != 'legal') {
    legalLink = (
      <TouchableOpacity 
        onPress={() => router.push('/legal')}
        //onPress={() => route.name == 'about' ? router.replace('/legal') : router.push('/legal')}
      >
        {legalLink}
      </TouchableOpacity>
    );
  }

  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>
      {aboutLink}
      {legalLink}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: Layout.space.base*2,
  },
  disabled: {
    color: Colors.secondary,
  },
});

export default BottomLinks;