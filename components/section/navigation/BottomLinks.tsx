import { StyleSheet, TouchableOpacity } from 'react-native';
import { usePathname } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import BoxView from '@/components/view/BoxView';
import TextView from '@/components/view/TextView';
import i18n from '@/translation/i18n';

const BottomLinks = () => {
  const router = useRouter();
  const path = usePathname();
  const sectionId: any = path.split('/').pop();
  let aboutLink = <TextView style={sectionId == 'about' ? styles.disabled : {}}>{i18n.t('About')}</TextView>;
  let legalLink = <TextView style={sectionId == 'legal' ? styles.disabled : {}}>{i18n.t('Legal')}</TextView>;

  if (sectionId != 'about') {
    aboutLink = (
      <TouchableOpacity onPress={() => router.push('/about')}>
        {aboutLink}
      </TouchableOpacity>
    );
  }

  if (sectionId != 'legal') {
    legalLink = (
      <TouchableOpacity onPress={() => router.push('/legal')}>
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