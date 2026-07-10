import { StyleSheet, TouchableOpacity } from 'react-native';
import { usePathname } from 'expo-router';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import TextView from '@/components/view/TextView';
import i18n from '@/translation/i18n';
import SectionManager from '@/manager/SectionManager';

const BottomLinks = () => {
  const router = useRouter();
  const path = usePathname();
  const sectionId: any = path.split('/').pop();

  let aboutLink = <TextView style={sectionId == 'about' ? styles.disabled : {}}>{i18n.t('About')}</TextView>;
  let legalLink = <TextView style={sectionId == 'legal' ? styles.disabled : {}}>{i18n.t('Legal')}</TextView>;
  let privacyLink = <TextView style={sectionId == 'privacy' ? styles.disabled : {}}>{i18n.t('Privacy')}</TextView>;

  if (sectionId != 'about') {
    aboutLink = (
      <TouchableOpacity onPress={() => SectionManager.push(router, 'about')}>
        {aboutLink}
      </TouchableOpacity>
    );
  }

  if (sectionId != 'legal') {
    legalLink = (
      <TouchableOpacity onPress={() => SectionManager.push(router, 'legal')}>
        {legalLink}
      </TouchableOpacity>
    );
  }

  if (sectionId != 'privacy') {
    privacyLink = (
      <TouchableOpacity onPress={() => SectionManager.push(router, 'privacy')}>
        {privacyLink}
      </TouchableOpacity>
    );
  }

  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>
      {aboutLink}
      {legalLink}
      {privacyLink}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: Layout.space.base*2,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base*2,
  },
  disabled: {
    color: Layout.colors.secondary,
  },
});

export default BottomLinks;