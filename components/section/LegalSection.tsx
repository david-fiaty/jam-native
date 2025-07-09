import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import BottomLinks from './navigation/BottomLinks';
import i18n from '@/translation/i18n';

const LegalSection = () => {
  return (
    <>
      <BoxView
        direction="column"
        align="flex-start"
        justify="flex-start"
        style={styles.container}
        scroll={true}
      >
        <TextView style={styles.title}>{i18n.t('Terms of Use')}</TextView>
        <TextView>{i18n.t('By using the JAM! application, you agree to comply with all terms and conditions stated in this legal notice. JAM! reserves the right to modify these terms at any time without prior notice. Continued use of the application constitutes your acceptance of any changes made to the terms.')}</TextView>

        <TextView style={styles.title}>{i18n.t('Data Privacy')}</TextView>
        <TextView>{i18n.t('JAM! is committed to protecting your personal data in compliance with applicable data protection laws. Any personal information collected through the application is used solely for the purpose of providing and improving our services. We do not share your data with third parties without your explicit consent, except where required by law.')}</TextView>

        <TextView style={styles.title}>{i18n.t('Intellectual Property')}</TextView>
        <TextView>{i18n.t('All content, trademarks, and other intellectual property displayed within the JAM! application are the exclusive property of JAM! or its partners. Unauthorized reproduction, modification, or distribution of any content without prior written permission is strictly prohibited and may result in legal action.')}</TextView>
      </BoxView>
      <BottomLinks />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default LegalSection;
