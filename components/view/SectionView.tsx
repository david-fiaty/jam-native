import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import TextView from './TextView';
import WelcomeSection from '../section/WelcomeSection';

type Props = {
  name?: any;
};

const SectionView = ({ name }: Props) => {

  if (!name) {
    return <WelcomeSection />
  }

  return (
    <TextView>SectionView</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export default SectionView;