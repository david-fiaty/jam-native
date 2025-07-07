import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import BottomLinks from './navigation/BottomLinks';
import BulletListView from '../view/BulletListView';
import i18n from '@/translation/i18n';

const PrivacySection = () => {
  return (
    <>
      <BoxView
        direction="column"
        align="flex-start"
        justify="flex-start"
        style={styles.container}
        scroll={true}
      >
        <TextView style={styles.title}>{i18n.t('Introduction')}</TextView>
        <TextView>
          {i18n.t('JAM! is a web and mobile platform that allows artists to share their projects, events, and achievements. We are committed to protecting the privacy and security of our users personal data. This privacy policy describes how we collect, use, and protect your personal information.')}
        </TextView>

        <TextView style={styles.title}>{i18n.t('Data Collection')}</TextView>
        <View>
          <TextView>{i18n.t('We collect various personal information, including:')}</TextView>
          <BulletListView data={[
            i18n.t('Name, surname (for personal profiles)'),
            i18n.t('Email address'),
            i18n.t('Phone number'),
            i18n.t('Location (latitude and longitude)'),
            i18n.t('Profile information (description, profile picture, etc.)'),
            i18n.t('Links to social media (Instagram, Facebook, LinkedIn)'),
            i18n.t('Specific information related to the type of profile (organization, venue, artist)'),
          ]} />
        </View>

        <TextView style={styles.title}>{i18n.t('Use of Data')}</TextView>
        <View>
          <TextView>{i18n.t('We use your data for:')}</TextView>
          <BulletListView data={[
            i18n.t('Personalizing your experience on JAM!'),
            i18n.t('Managing events and interactions between users'),
            i18n.t('Offering targeted advertising'),
            i18n.t('Continuously improving the user experience'),
          ]} />

        </View>

        <TextView style={styles.title}>{i18n.t('Data Sharing')}</TextView>
        <View>
          <TextView>{i18n.t('We share your data with:')}</TextView>
          <BulletListView data={[
            i18n.t('Technical providers (hosting services, analytics tools)'),
            i18n.t('Business partners'),
            i18n.t('Public administrations, if required by law'),
          ]} />
        </View>

        <TextView style={styles.title}>{i18n.t('User Rights')}</TextView>
        <View>
          <TextView>{i18n.t('As a user, you have the right to:')}</TextView>
          <BulletListView data={[
            i18n.t('Access your data'),
            i18n.t('Rectify your data'),
            i18n.t('Request the erasure (deletion) of your data'),
            i18n.t('Request data portability'),
            i18n.t('Object to the processing of your data'),
          ]} />
        </View>

        <TextView style={styles.title}>{i18n.t('Exercising Your Rights')}</TextView>
        <TextView>{i18n.t('To exercise your rights, please contact us at the following email address: contact@jammm.app.')}</TextView>

        <TextView style={styles.title}>{i18n.t('Data Security')}</TextView>
        <View>
          <TextView style={styles.title}>{i18n.t('We implement several measures to protect your data:')}</TextView>
          <BulletListView data={[
            i18n.t('Data encryption'),
            i18n.t('Firewalls'),
            i18n.t('Regular backups'),
          ]} />
        </View>

        <TextView style={styles.title}>{i18n.t('International Data Transfers')}</TextView>
        <View>
          <BulletListView data={[
            i18n.t('We comply with the GDPR for all data transfers outside the EU/EEA.'),
            i18n.t('We use adequacy decisions for countries recognized by the European Commission and Standard Contractual Clauses for other countries.'),
            i18n.t('We apply enhanced security measures, such as data encryption.'),
          ]} />
        </View>

        <TextView style={styles.title}>{i18n.t('Changes to the Policy')}</TextView>
        <TextView>
          {i18n.t('We reserve the right to modify this privacy policy at any time. In case of significant changes, we will notify you by email.')}
        </TextView>

        <TextView style={styles.title}>{i18n.t('How to request deletion of your data on JAM!')}</TextView>
        <TextView>
          {i18n.t('If you want to delete your data associated with the Jammm app, please contact us at contact@jammm.app . We will remove all data within 7 days.')}
        </TextView>
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

export default PrivacySection;
