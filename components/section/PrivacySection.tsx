import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import BottomLinks from './navigation/BottomLinks';

const PrivacySection = () => {
  const router = useRouter();

  return (
    <BoxView 
    direction="column" 
    align="flex-start" 
    justify="flex-start" 
    style={styles.container}
    scroll={true}
  >
      <TextView style={styles.title}>Introduction</TextView>
      <TextView>
        Jamm is a web and mobile platform that allows artists to share their projects, events, and achievements.
        We are committed to protecting the privacy and security of our users' personal data.
        This privacy policy describes how we collect, use, and protect your personal information.
      </TextView>

      <TextView style={styles.title}>Data Collection</TextView>
      <TextView>
        We collect various personal information, including:
        - Name, surname (for personal profiles)
        - Email address
        - Phone number
        - Location (latitude and longitude)
        - Profile information (description, profile picture, etc.)
        - Links to social media (Instagram, Facebook, LinkedIn)
        - Specific information related to the type of profile (organization, venue, artist)
      </TextView>

      <TextView style={styles.title}>Use of Data</TextView>
      <TextView>
        We use your data for:
        - Personalizing your experience on Jamm
        - Managing events and interactions between users
        - Offering targeted advertising
        - Continuously improving the user experience
      </TextView>

      <TextView style={styles.title}>Data Sharing</TextView>
      <TextView>
        We share your data with:
        - Technical providers (hosting services, analytics tools)
        - Business partners
        - Public administrations, if required by law
      </TextView>

      <TextView style={styles.title}>User Rights</TextView>
      <TextView>
        As a user, you have the right to:
        - Access your data
        - Rectify your data
        - Request the erasure (deletion) of your data
        - Request data portability
        - Object to the processing of your data
      </TextView>

      <TextView style={styles.title}>Exercising Your Rights</TextView>
      <TextView>
        To exercise your rights, please contact us at the following email address: contact@jammm.app.
      </TextView>

      <TextView style={styles.title}>Data Security</TextView>
      <TextView>
        We implement several measures to protect your data:
        - Data encryption
        - Firewalls
        - Regular backups
      </TextView>

      <TextView style={styles.title}>International Data Transfers</TextView>
      <TextView>
        We comply with the GDPR for all data transfers outside the EU/EEA.
        We use adequacy decisions for countries recognized by the European Commission and Standard Contractual Clauses for other countries.
        We apply enhanced security measures, such as data encryption.
      </TextView>

      <TextView style={styles.title}>Changes to the Policy</TextView>
      <TextView>
        We reserve the right to modify this privacy policy at any time.
        In case of significant changes, we will notify you by email.
      </TextView>

      <TextView style={styles.title}>How to request deletion of your data on Jamm</TextView>
      <TextView>
        If you want to delete your data associated with the Jammm app, please contact us at contact@jammm.app . We will remove all data within 7 days.
      </TextView>

      <BottomLinks />
    </BoxView>
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
